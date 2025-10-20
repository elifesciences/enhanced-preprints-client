import './review-content.scss';
import { Descriptors } from '../descriptors/descriptors';

type Props = { content: string, id?: string, peerReviewUrl?: string, doi?: string };
export const ReviewContent = ({
  content, id = '', doi,
}: Props) => {
  const contentWithImgurProxy = content.replaceAll(/ src="(https:\/\/i\.imgur\.com\/[^"]+)"/g, ' src="https://proxy.duckduckgo.com/iu/?u=$1"');
  return (<section id={id} className="review-content">
    <div className="review-content_body" dangerouslySetInnerHTML={{ __html: contentWithImgurProxy }}/>
    {doi && <Descriptors doi={doi}/>}
  </section>);
};
