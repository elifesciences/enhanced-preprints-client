export type SerialisedTimelineEvent = {
  name?: string,
  url: string,
  version: number,
  versionIndicator?: string,
  date: string,
  datePrefix?: string,
  withEvaluationSummary?: true,
  versionOfRecord?: true,
};
