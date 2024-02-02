export type ArticleStatus = {
  type: 'reviewed_preprint' | 'revised_preprint' | 'version_of_record',
  status: string,
  isPreview: boolean,
};
