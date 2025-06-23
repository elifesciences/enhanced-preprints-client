import * as z from 'zod/v4';
import { config } from '../../config';
import { jsonFetch, jsonFetchOrNull } from './json-fetch';
import { ArticleSummary, EnhancedArticleWithVersions } from '../../types';
import { PublishedEnhancedArticleMetaDataForJournal } from '../../types/reviewed-preprint-snippet';

const ProcessedArticleSchema = z.object({});

const PeerReviewSchema = z.object({});

const RelatedContentSchema = z.object({});

const EnhancedArticleSchema = z.object({
  id: z.string(),
  msid: z.string(),
  doi: z.string(),
  versionIdentifier: z.string(),
  versionDoi: z.string().optional(),
  umbrellaDoi: z.string().optional(),
  // When we drop the old article schema from the DB,
  // we can change ProcessedArticle to exclude these properties and drop `Omit` here
  article: ProcessedArticleSchema,
  preprintDoi: z.string().optional(),
  preprintUrl: z.string().optional(),
  preprintPosted: z.date().optional(),
  sentForReview: z.date().optional(),
  peerReview: PeerReviewSchema.optional(),
  published: z.date().optional(),
  publishedYear: z.number().optional(),
  volume: z.string().optional(),
  eLocationId: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  pdfUrl: z.string().optional(),
  relatedContent: RelatedContentSchema.optional(),
});

const VersionSummarySchema = z.object({});

const EnhancedArticleWithVersionsSchema = z.object({
  article: EnhancedArticleSchema,
  versions: z.object({}).catchall(VersionSummarySchema),
  metrics: z.object({}).optional(),
});

export const fetchVersion = async (id: string, preview: boolean = false):Promise<EnhancedArticleWithVersions> => {
  const fetched = await jsonFetchOrNull<unknown>(`${config.apiServer}/api/preprints/${id}${preview ? '?previews=true' : ''}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validated = EnhancedArticleWithVersionsSchema.safeParse(fetched);
  return fetched as EnhancedArticleWithVersions;
};

export const fetchVersions = () => jsonFetch<{ items: ArticleSummary[], total: number }>(`${config.apiServer}/api/preprints`);

export const fetchVersionsNoContent = async (page: number, perPage: number, order: 'asc' | 'desc', useDate: 'default' | 'published', startDate: string, endDate: string) => {
  const url = [
    `${config.apiServer}/api/preprints-no-content?`,
    [
      `page=${page}`,
      `per-page=${perPage}`,
      `order=${order}`,
      useDate === 'published' ? 'use-date=firstPublished' : '',
      startDate ? `start-date=${startDate}` : '',
      endDate ? `end-date=${new Date(new Date().setDate(new Date(endDate).getUTCDate() + 1)).toISOString().split('T')[0]}` : '',
    ].filter((q) => q).join('&'),
  ].join('');
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`error fetching (${url}): ${response.statusText}`);
      }

      const items = await response.json() as PublishedEnhancedArticleMetaDataForJournal[];

      const total = response.headers.get('x-total-count')
        ? parseInt(response.headers.get('x-total-count') as string, 10)
        : Object.keys(items).length;

      return {
        total,
        items,
      };
    });
};
