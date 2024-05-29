import { Fragment } from 'react';

type ImprovedTimelineItem = {
  name: string,
  date: string,
};

type ImprovedTimelineProps = {
  items: Array<ImprovedTimelineItem>
};

export const ImprovedTimeline = ({ items }: ImprovedTimelineProps) => (
  <dl className="definition-list definition-list--timeline">
    {
        items.map((item, index) => (
          <Fragment key={index}>
            <dt>{item.name}</dt>
            <dd>
              <span className="version">v1</span>
              <time dateTime="2023-03-18">{item.date}</time>
              <span className="description">Not revised</span>
            </dd>
          </Fragment>
        ))
      }
  </dl>
);
