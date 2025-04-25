import './review-process.scss';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

type ReviewProcessProps = {
  current?: number;
  status?: 'reviewed' | 'revised' | 'curated',
  authorResponse?: boolean,
};

export const ReviewProcess = ({ current, status, authorResponse }: ReviewProcessProps) => {
  const { t } = useTranslation();
  const type = current && current > 1 ? 'revised' : 'reviewed';
  const statusClass = status ? ` review-process--status-${status}` : '';
  return (
    <section className={`review-process review-process--${type}${statusClass}`}>
      <h2 className="review-process__header" id="review-process">Peer review process</h2>
      <div className="review-process__container">
        <p className="review-process__body">{parse(t(`review_process_${type}${type === 'reviewed' && authorResponse === true ? '_with_author_response' : ''}`))}</p>
        <a className="review-process__link" href={t('process_url')}>{t('process_url_read_more')}</a>
      </div>
    </section>
  );
};
