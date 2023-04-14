import { readFileSync } from 'fs';
import { config } from '../config';
import { jsonFetch } from './json-fetch';
import { Content } from '../types/content';
import { MetaData, PeerReview } from '../types';

type ReviewsJson = {
  [index: string]: PeerReview;
};

const reviewsJson = JSON.parse(readFileSync('reviews.json').toString()) as ReviewsJson;

export const fetchMetadata = (id: string) => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${id}/metadata`);
export const fetchContent = (id: string) => jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${id}/content`);
export const fetchReviews = (id: string) => {
  if (reviewsJson[id]) {
    return reviewsJson[id];
  }
  return jsonFetch<PeerReview>(`${config.apiServer}/api/reviewed-preprints/${id}/reviews`);
};
