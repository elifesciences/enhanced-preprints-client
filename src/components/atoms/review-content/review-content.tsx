import './review-content.scss';
import '../../../i18n';
import { Descriptors } from '../descriptors/descriptors';

type Props = { content: string, id?: string, peerReviewUrl?: string, doi?: string };
export const ReviewContent = ({
  content, id = '', doi,
}: Props) => (
  <section id={id} className="review-content">
    <div className="review-content_body" dangerouslySetInnerHTML={{ __html: content }} />
    {doi && <Descriptors doi={doi}/>}
  </section>
);
