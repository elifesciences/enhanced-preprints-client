import { readFileSync } from 'fs';
import { config } from '../config';
import { jsonFetch, jsonFetchOrNull } from './json-fetch';
import {
  ArticleSummary, Content, EnhancedArticleWithVersions, MetaData, PeerReview,
} from '../types';
import { EnhancedArticleNoContent } from '../types/reviewed-preprint-snippet';

type ReviewsJson = {
  [index: string]: PeerReview;
};

const reviewsJson = JSON.parse(readFileSync(config.reviewsConfigFile).toString()) as ReviewsJson;

export const fetchMetadata = (id: string) => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${id}/metadata`);
export const fetchContent = (id: string) => jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${id}/content`);
export const fetchReviews = (id: string) => {
  if (reviewsJson[id]) {
    return Promise.resolve(reviewsJson[id]) as Promise<PeerReview>;
  }
  return jsonFetch<PeerReview>(`${config.apiServer}/api/reviewed-preprints/${id}/reviews`)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });
};

export const fetchVersion = (id: string, preview: boolean = false) => jsonFetchOrNull<EnhancedArticleWithVersions>(`${config.apiServer}/api/preprints/${id}${preview ? '?previews=true' : ''}`);
export const fetchVersions = () => jsonFetch<{ items: ArticleSummary[], total: number }>(`${config.apiServer}/api/preprints`);
// export const fetchVersionsNoContent = (page: number, perPage: number, order: string) => jsonFetch<EnhancedArticleNoContent[]>(`${config.apiServer}/api/preprints-no-content?page=${page}&per-page=${perPage}&order=${order}`);
export const fetchVersionsNoContent = async (page: number, perPage: number, order: string) => {
  const url = `${config.apiServer}/api/preprints-no-content?page=${page}&per-page=${perPage}&order=${order}`;
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`error fetching (${url}): ${response.statusText}`);
      }

      const items = await response.json() as EnhancedArticleNoContent[];

      const total = response.headers.get('x-total-count')
        ? parseInt(response.headers.get('x-total-count') as string, 10)
        : Object.keys(items).length;

      return {
        total,
        items,
      };
    });
};
