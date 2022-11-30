import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';
import { FullManuscriptConfig, getManuscriptsLatest } from '../../manuscripts';
import { jsonFetch } from '../../utils/json-fetch';
import { Author, MetaData } from '../../types';
import { SubjectItem, SubjectList } from '../../components/molecules/article-flag-list/article-flag-list';
import { TimelineEvent } from '../../components/molecules/timeline/timeline';
import { contentToHtml } from '../../utils/content-to-html';

type BadRequestMessage = {
  title: 'bad request' | 'not found',
  detail?: string,
};

type ReviewedPreprintItemResponse = {
  indexContent?: string,
} & ReviewedPreprintSnippet;

type ReviewedPreprintSnippet = {
  id: string,
  doi: string,
  pdf: string,
  status: 'reviewed',
  authorLine?: string,
  title?: string,
  published?: string,
  reviewedDate?: string,
  versionDate?: string,
  statusDate?: string,
  stage: 'published',
  subjects?: SubjectItem[],
};

type ReviewedPreprintListResponse = {
  total: number,
  items: ReviewedPreprintSnippet[],
};

const prepareAuthor = (author: Author) : string => `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`;

const prepareAuthorLine = (authors: Author[]) : undefined | string => {
  if (authors.length === 0) {
    return;
  }

  let authorLine = '';

  if (authors.length > 0) {
    authorLine += prepareAuthor(authors[0]);
  }

  if (authors.length > 1) {
    authorLine += `, ${prepareAuthor(authors[1])}`;
  }

  if (authors.length > 2) {
    authorLine += `${(authors.length > 3) ? ' ... ' : ', '}${prepareAuthor(authors[authors.length - 1])}`;
  }

  return authorLine; // eslint-disable-line consistent-return
};

const reviewedDate = (timeline: TimelineEvent[]) : string | undefined => {
  const reviewedEvent = timeline.find((obj) => obj.name === 'Reviewed Preprint posted');

  return reviewedEvent ? `${reviewedEvent.date}T03:00:00Z` : undefined;
};

export const writeResponse = (res: NextApiResponse, contentType: string, statusCode: 200 | 400 | 404, message: BadRequestMessage | ReviewedPreprintListResponse | ReviewedPreprintItemResponse) : void => {
  res
    .writeHead(statusCode, {
      'Content-Type': contentType,
      'Cache-Control': statusCode === 200 ? 'max-age=300, public, stale-if-error=86400, stale-while-revalidate=300' : 'must-revalidate, no-cache, private',
      Vary: ['Accept', 'Authorization'],
    })
    .end(JSON.stringify(message));
};

const errorBadRequest = (res: NextApiResponse, message: string) : void => {
  writeResponse(res, 'application/problem+json', 400, {
    title: 'bad request',
    detail: message,
  });
};

export const errorNotFoundRequest = (res: NextApiResponse) : void => {
  writeResponse(res, 'application/json', 404, {
    title: 'not found',
  });
};

type Param = string | Number | Array<string | Number> | null;

const queryParam = (req: NextApiRequest, key: string, defaultValue: Param = null) : Param => req.query[key] ?? defaultValue;

export const reviewedPreprintSnippet = (manuscript: FullManuscriptConfig, meta?: MetaData) : ReviewedPreprintSnippet => {
  const reviewed = reviewedDate(manuscript.status.timeline);

  return {
    id: manuscript.msid,
    doi: manuscript.preprintDoi,
    pdf: manuscript.pdfUrl,
    status: 'reviewed',
    authorLine: meta ? prepareAuthorLine(meta.authors) : undefined,
    title: meta ? contentToHtml(meta.title) : undefined,
    published: reviewed,
    reviewedDate: reviewed,
    versionDate: reviewed,
    statusDate: reviewed,
    stage: 'published',
    subjects: SubjectList({ msas: manuscript.msas }),
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const items = getManuscriptsLatest(config.manuscriptConfigFile).map((manuscript) => reviewedPreprintSnippet(manuscript));

  const [perPage, page] = [
    queryParam(req, 'per-page', 20),
    queryParam(req, 'page', 1),
  ].map((v) => {
    const n = Number(v);

    return n.toString() === parseInt(n.toString(), 10).toString() ? n : -1;
  });
  const order = queryParam(req, 'order', 'desc');

  if (page <= 0) {
    errorBadRequest(res, 'expecting positive integer for \'page\' parameter');
  }

  if (perPage <= 0 || perPage > 100) {
    errorBadRequest(res, 'expecting positive integer between 1 and 100 for \'per-page\' parameter');
  }

  if (typeof order !== 'string' || ['asc', 'desc'].includes(order) === false) {
    errorBadRequest(res, 'expecting either \'asc\' or \'desc\' for \'order\' parameter');
  }

  const offset = (page - 1) * perPage;

  writeResponse(res, 'application/vnd.elife.reviewed-preprint-list+json; version=1', 200, {
    total: items.length,
    items: await Promise
      .all(
        (
          items
            // Order is not working when per-page is set.
            .sort((a, b) => {
              const diff = new Date(a.statusDate ?? '2000-01-01').getTime() - new Date(b.statusDate ?? '2000-01-01').getTime();

              return (order === 'asc' && diff > 0) || (order !== 'asc' && diff < 0) ? 1 : -1;
            })
            .slice(offset, offset + perPage)
        )
          .map(
            async (item) => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${item.doi}/metadata`)
              .then((js) => ({ ...item, title: contentToHtml(js.title), authorLine: prepareAuthorLine(js.authors) })),
          ),
      ),
  });
};
