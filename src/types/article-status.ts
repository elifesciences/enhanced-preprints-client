export type ArticleStatus = {
  type: 'Reviewed preprint' | 'Revised preprint' | 'Version of record',
  status: string,
  isPreview: boolean,
};
