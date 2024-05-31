type TimelineEventBasic = {
  name: string,
  date: string,
};

type TimelineEventSimple = TimelineEventBasic & {
  link?: undefined,
  eventDescription?: undefined,
};

type TimelineEventWithLink = TimelineEventBasic & {
  link: {
    text: string,
    url?: string,
  },
  eventDescription?: undefined,
};

type TimelineEventWithDescription = TimelineEventBasic & {
  link?: undefined,
  eventDescription: string,
};

export type TimelineEvent = TimelineEventSimple | TimelineEventWithLink | TimelineEventWithDescription;

export type ImprovedTimelineEvent = {
  name?: string,
  url: string,
  version: number,
  versionIndicator?: string,
  date: string,
};
