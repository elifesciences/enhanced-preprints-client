import { readFileSync } from 'fs';
import { config } from '../config';
import { jsonFetch } from './json-fetch';
import {
  Content, EnhancedArticleWithVersions, MetaData, PeerReview,
} from '../types';
import { ArticleSummary } from '../types/enhanced-article';

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
    .then(() => null)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });
};

export const fetchVersion = (id: string) => jsonFetch<EnhancedArticleWithVersions>(`${config.apiServer}/api/preprints/${id}`);
export const fetchVersions = () => jsonFetch<{ items: ArticleSummary[], total: number }>(`${config.apiServer}/api/preprints`);
