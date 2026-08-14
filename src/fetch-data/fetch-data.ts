import * as z from 'zod/v4';
import {type EnhancedArticleWithVersions} from './enhanced-article-with-versions';
import { jsonFetch, jsonFetchOrNull } from './json-fetch';
import { MetricsSchema } from './metrics';
import { PeerReviewSchema } from './peer-review';
import {ProcessedArticleSchema} from './processed-article';
import { RelatedContentSchema } from './related-content';
import { VersionSummarySchema } from './version-summary';
import { config } from '../config';
import {
  type ArticleSummary,
  type PublishedEnhancedArticleMetaDataForJournal,
  IsoDateStringSchema,
} from '../types';

const EnhancedArticleSchema = z.object({
  id: z.string(),
  msid: z.string(),
  doi: z.string(),
  versionIdentifier: z.string(),
  versionDoi: z.string().optional(),
  umbrellaDoi: z.string().optional(),
  article: ProcessedArticleSchema,
  preprintDoi: z.string().optional(),
  preprintUrl: z.string().optional(),
  preprintPosted: IsoDateStringSchema.optional(),
  sentForReview: IsoDateStringSchema.optional(),
  peerReview: PeerReviewSchema.optional(),
  published: IsoDateStringSchema.nullable(),
  publishedYear: z.number().optional(),
  volume: z.string().optional(),
  eLocationId: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  pdfUrl: z.string().optional(),
  relatedContent: z.array(RelatedContentSchema).optional(),
  license: z.string().optional(),
});

const EnhancedArticleWithVersionsSchema = z.object({
  article: EnhancedArticleSchema,
  versions: z.object({}).catchall(VersionSummarySchema),
  metrics: MetricsSchema.optional(),
  siteName: z.string().optional(),
});

export const fetchVersion = async (id: string, preview: boolean = false): Promise<EnhancedArticleWithVersions | null> => {
  const fetched = await jsonFetchOrNull<unknown>(`${config.apiServer}/api/preprints/${id}${preview ? '?previews=true' : ''}`);
  if (fetched === null) {
    console.error(`fetchVersion(${id}): jsonFetchOrNull returned null`, { id, preview });
    return null;
  }

  const validated = EnhancedArticleWithVersionsSchema.safeParse(fetched);

  if (!validated.success) {
    console.error(`fetchVersion(${id}): failed to validate EnhancedArticleWithVersionsSchema`, validated.error);
    return null;
  }

  return validated.data;
};

export const fetchVersions = (): Promise<{ items: ArticleSummary[], total: number }> => (
  jsonFetch<{ items: ArticleSummary[], total: number }>(`${config.apiServer}/api/preprints`)
);

export const fetchVersionsNoContent = async (
  page: number,
  perPage: number,
  order: 'asc' | 'desc',
  useDate: 'default' | 'published',
  startDate: string,
  endDate: string,
): Promise<{ total: number, items: PublishedEnhancedArticleMetaDataForJournal[] }> => {
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
