import { contentToJsx } from '../../../utils/content-to-jsx';
import './figure.scss';
import { FigureContent } from '../../../types';

export const Figure = ({ content }: { content: FigureContent }) => (
  <figure className="figure" id={content.id}>
    <label className="figure__label">{content.label}</label>
    {contentToJsx(content.content)}
    <figcaption className="figure__caption prototype">{contentToJsx(content.caption)}</figcaption>
  </figure>
);
