import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';
import { FullManuscriptConfig, getManuscripts } from '../../manuscripts';
import { jsonFetch } from '../../utils/json-fetch';
import { Author, Content, MetaData } from '../../types';
import { SubjectItem, SubjectList } from '../../components/molecules/article-flag-list/article-flag-list';
import { TimelineEvent } from '../../components/molecules/timeline/timeline';

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
  status: string,
  authorLine?: string,
  title?: string,
  published?: string,
  reviewedDate?: string,
  versionDate?: string,
  statusDate?: string,
  stage: string,
  subjects?: SubjectItem[],
};

type ReviewedPreprintListResponse = {
  total: number,
  items: ReviewedPreprintSnippet[],
};

const manuscripts = getManuscripts(config.manuscriptConfigFile);

const wrapContent = (content: Content) : string => {
  let tag = null;
  let c = null;

  if (typeof content !== 'string' && !Array.isArray(content)) {
    switch (content.type) {
      case 'Emphasis':
        tag = 'i';
        c = content.content;
        break;
      case 'Strong':
        tag = 'b';
        c = content.content;
        break;
      case 'Subscript':
        tag = 'sub';
        c = content.content;
        break;
      case 'Superscript':
        tag = 'sup';
        c = content.content;
        break;
      default:
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return (tag ? `<${tag}>` : '') + renderContent(c !== null ? c : content) + (tag ? `</${tag}>` : '');
};

const renderContent = (content: Content) : string => {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((i: Content) => wrapContent(i)).join(' ');
  }

  return wrapContent(content);
};

const prepareAuthor = (author: Author) : string => `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`;

const prepareAuthorLine = (authors: Author[]) : string | undefined => {
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

  return authorLine;
};

const reviewedDate = (timeline: TimelineEvent[]) : string | undefined => {
  const reviewedEvent = timeline.find((obj) => obj.name === 'Reviewed Preprint posted');

  return reviewedEvent ? `${reviewedEvent.date}T03:00:00Z` : undefined;
};

export const writeResponse = (res: NextApiResponse, contentType: string, statusCode: 200 | 400 | 404, message: BadRequestMessage | ReviewedPreprintListResponse | ReviewedPreprintItemResponse) : void => {
  res
    .setHeader('Content-Type', contentType)
    .status(statusCode)
    .write(JSON.stringify(message));

  res.end();
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

export const reviewedPreprintSnippet = (meta: MetaData, manuscript: FullManuscriptConfig) : ReviewedPreprintSnippet => {
  const reviewed = reviewedDate(manuscript.status.timeline);

  return {
    id: manuscript.msid,
    doi: manuscript.preprintDoi,
    pdf: manuscript.pdfUrl,
    status: 'reviewed',
    authorLine: prepareAuthorLine(meta.authors),
    title: renderContent(meta.title),
    published: reviewed,
    reviewedDate: reviewed,
    versionDate: reviewed,
    statusDate: reviewed,
    stage: 'published',
    subjects: SubjectList({ msas: manuscript.msas }),
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ids = Object.keys(manuscripts).filter((id) => id.match(/^[0-9]+$/));

  const meta = await Promise.all(ids.map(async (id) => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscripts[id].preprintDoi}/metadata`).then((js) => ({
    id,
    data: js,
  }))));

  const items = ids.map((id) => {
    const iMeta = meta.find((obj) => obj.id === id)?.data;

    if (iMeta === undefined) {
      throw new Error(`MetaData not found for ${id}`);
    }

    return reviewedPreprintSnippet(iMeta, manuscripts[id]);
  });

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

  items.sort((a, b) => {
    const diff = new Date(a.statusDate ?? '2000-01-01').getTime() - new Date(b.statusDate ?? '2000-01-01').getTime();

    return (order === 'asc' && diff > 0) || (order !== 'asc' && diff < 0) ? 1 : -1;
  });

  const offset = (page - 1) * perPage;

  writeResponse(res, 'application/vnd.elife.reviewed-preprint-list+json; version=1', 200, {
    total: ids.length,
    items: items.slice(offset, offset + perPage),
  });
};
