import './review-process.scss';
import '../../../i18n';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

type ReviewProcessProps = {
  current?: number;
};

export const ReviewProcess = ({ current }: ReviewProcessProps) => {
  const { t } = useTranslation();
  const type = current && current > 1 ? 'revised' : 'reviewed';
  return (
    <section className={`review-process review-process--${type}`}>
      <h2 className="review-process__header" id="review-process">Peer review process</h2>
      <div className="review-process__container">
        <p className="review-process__body">{parse(t(`review_process_${type}`))}</p>
        <a className="review-process__link" href={t('process_url')}>Read more about eLife’s peer review process.</a>
      </div>
    </section>
  );
};
