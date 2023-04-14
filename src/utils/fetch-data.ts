import { config } from '../config';
import { jsonFetch } from './json-fetch';
import { Content } from '../types/content';
import { MetaData, PeerReview } from '../types';

export const fetchMetadata = (id: string) => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${id}/metadata`);
export const fetchContent = (id: string) => jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${id}/content`);
export const fetchReviews = (id: string) => jsonFetch<PeerReview>(`${config.apiServer}/api/reviewed-preprints/${id}/reviews`);
