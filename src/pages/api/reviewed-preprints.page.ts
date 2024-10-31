import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import { fetchVersionsNoContent } from '../../utils/data-fetch';
import {
  Author, EnhancedArticle, ReviewedPreprintSnippet,
} from '../../types';
import { getSubjects } from '../../components/molecules/article-flag-list/article-flag-list';
import { contentToHtml } from '../../utils/content';
import { EnhancedArticleNoContent } from '../../types/reviewed-preprint-snippet';
import { config } from '../../config';

type BadRequestMessage = {
  title: 'bad request' | 'not found',
  detail?: string,
};

type ReviewedPreprintItemResponse = {
  indexContent?: string,
} & ReviewedPreprintSnippet;

type ReviewedPreprintListResponse = {
  total: number,
  items: ReviewedPreprintSnippet[],
};

const prepareAuthor = (author: Author) : string => {
  const givenNames = (author.givenNames ?? []).join(' ');
  const familyNames = (author.familyNames ?? []).join(' ');

  return `${givenNames}${familyNames ? ' ' : ''}${familyNames}`;
};

const prepareAuthorLine = (authors: Author[]) : undefined | string => {
  if (authors.length === 0) {
    return;
  }

  const authorLine = [];

  if (authors.length > 0) {
    authorLine.push(prepareAuthor(authors[0]));
  }

  if (authors.length > 1) {
    authorLine.push(prepareAuthor(authors[1]));
  }

  if (authors.length > 2) {
    authorLine.push(prepareAuthor(authors[authors.length - 1]));
  }

  return [authorLine.slice(0, 2).join(', '), authorLine.length > 2 ? authorLine[2] : null].filter((a) => a !== null).join(authors.length > 3 ? ' ... ' : ', '); // eslint-disable-line consistent-return
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

const toIsoStringWithoutMilliseconds = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const enhancedArticleNoContentToSnippet = ({
  msid,
  preprintDoi,
  versionIdentifier,
  pdfUrl,
  article,
  published,
  subjects,
  firstPublished,
}: EnhancedArticleNoContent): ReviewedPreprintSnippet => ({
  id: msid,
  doi: preprintDoi,
  version: +versionIdentifier,
  pdf: pdfUrl,
  status: 'reviewed',
  authorLine: prepareAuthorLine(article.authors || []),
  title: contentToHtml(article.title),
  published: toIsoStringWithoutMilliseconds(new Date(firstPublished)),
  reviewedDate: toIsoStringWithoutMilliseconds(new Date(firstPublished)),
  versionDate: toIsoStringWithoutMilliseconds(new Date(published!)),
  statusDate: toIsoStringWithoutMilliseconds(new Date(published!)),
  stage: 'published',
  subjects: getSubjects(subjects || []),
});

export const enhancedArticleToReviewedPreprintItemResponse = ({
  msid,
  versionIdentifier,
  preprintDoi,
  pdfUrl,
  article,
  published,
  subjects,
  article: { content, authors },
}: EnhancedArticle, firstPublished: Date | null): ReviewedPreprintItemResponse => ({
  id: msid,
  doi: preprintDoi,
  version: +versionIdentifier,
  pdf: pdfUrl,
  status: 'reviewed',
  authorLine: prepareAuthorLine(authors || []),
  title: contentToHtml(article.title),
  published: toIsoStringWithoutMilliseconds(new Date(firstPublished ?? published!)),
  reviewedDate: toIsoStringWithoutMilliseconds(new Date(firstPublished ?? published!)),
  versionDate: toIsoStringWithoutMilliseconds(new Date(published!)),
  statusDate: toIsoStringWithoutMilliseconds(new Date(published!)),
  stage: 'published',
  subjects: getSubjects(subjects || []),
  indexContent: `${authors?.map((author) => prepareAuthor(author)).join(', ')} ${contentToHtml(content)}`,
});

const serverApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const [perPage, page] = [
    queryParam(req, 'per-page', 20),
    queryParam(req, 'page', 1),
  ].map((v) => {
    const n = Number(v);

    return n.toString() === parseInt(n.toString(), 10).toString() ? n : -1;
  });

  const order = (queryParam(req, 'order') || 'desc').toString();
  const useDate = (queryParam(req, 'use-date') || 'default').toString();
  const startDate = (queryParam(req, 'start-date') || '').toString();
  const endDate = (queryParam(req, 'end-date') || '').toString();

  if (page <= 0) {
    errorBadRequest(res, 'expecting positive integer for \'page\' parameter');
  }

  if (perPage <= 0 || perPage > 100) {
    errorBadRequest(res, 'expecting positive integer between 1 and 100 for \'per-page\' parameter');
  }

  if (!['asc', 'desc'].includes(order)) {
    errorBadRequest(res, 'expecting either \'asc\' or \'desc\' for \'order\' parameter');
  }

  if (!['default', 'published'].includes(useDate)) {
    errorBadRequest(res, 'expecting either \'default\' or \'published\' for \'use-date\' parameter');
  }

  if (startDate && !moment(startDate, 'YYYY-MM-DD', true).isValid()) {
    errorBadRequest(res, 'expecting YYYY-MM-DD format for \'start-date\' parameter');
  }

  if (endDate && !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
    errorBadRequest(res, 'expecting YYYY-MM-DD format for \'end-date\' parameter');
  }

  const results = await fetchVersionsNoContent(config.siteName, page, perPage, order as 'asc' | 'desc', useDate as 'default' | 'published', startDate, endDate);

  const items = Array.from(results.items).map(enhancedArticleNoContentToSnippet);

  writeResponse(res, 'application/vnd.elife.reviewed-preprint-list+json; version=1', 200, {
    total: results.total,
    items,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => serverApi(req, res);
