import { Fragment } from 'react';
import '../../../i18n';
import './improved-timeline.scss';
import { useTranslation } from 'react-i18next';

type ImprovedTimelineItem = {
  version: number,
  date: string,
};

type ImprovedTimelineProps = {
  items: Array<ImprovedTimelineItem>,
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const ImprovedTimeline = ({ items }: ImprovedTimelineProps) => {
  const { t } = useTranslation();
  return (
    <dl className="improved-review-timeline">
      {
        items.map((item, index) => {
          const typeClass = `improved-review-timeline__${item.version > 1 ? 'revised' : 'reviewed'}`;
          return (
            <Fragment key={index}>
              <dt className={`improved-review-timeline__event ${typeClass}`}>Reviewed Preprint</dt>
              <dd className={`improved-review-timeline__detail ${typeClass}`}>
                <span className="improved-review-timeline__version">{`v${item.version}`}</span>
                <time className="improved-review-timeline__date" dateTime={item.date.toString()}>{formatDate(item.date)}</time>
                <a className="improved-review-timeline__link" href={t('process_url')}>{item.version > 1 ? 'Revised by authors' : 'Not revised'}</a>
              </dd>
            </Fragment>
          );
        })
      }
    </dl>
  );
};
