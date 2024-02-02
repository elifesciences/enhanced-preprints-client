type TimelineEventBasic = {
  name: string,
  identifier: string,
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
