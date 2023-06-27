import { contentToJsx } from '../../../utils/content-to-jsx';
import './figure.scss';
import { FigureContent } from '../../../types';

export const Figure = ({ content }: { content: FigureContent }) => (
  <figure className="figure" {...(content.id && { id: content.id })}>
    {content.label && <label className="figure__label">{content.label}</label>}
    {contentToJsx(content.content)}
    {content.caption && <figcaption className="figure__caption">{contentToJsx(content.caption)}</figcaption>}
  </figure>
);
