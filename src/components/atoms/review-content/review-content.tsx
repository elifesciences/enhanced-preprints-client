import { type JSX } from 'react';
import './review-content.scss';
import { Descriptors } from '../descriptors/descriptors';

type Props = { content: string, id?: string, peerReviewUrl?: string, doi?: string };
export const ReviewContent = ({
  content, id = '', doi,
}: Props): JSX.Element => (<section id={id} className="review-content">
  <div className="review-content_body" dangerouslySetInnerHTML={{ __html: content }}/>
  {doi && <Descriptors doi={doi}/>}
</section>);
