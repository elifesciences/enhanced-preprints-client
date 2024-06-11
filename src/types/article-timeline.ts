export type TimelineEvent = {
  name?: string,
  url: string,
  version: number,
  versionIndicator?: string,
  date: Date,
};

export type SerialisedTimelineEvent = (Omit<TimelineEvent, 'date'> & { date: string });
