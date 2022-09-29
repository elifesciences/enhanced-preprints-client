import { FigureContent } from '../../../types/content';
import { contentToJsx } from '../../../utils/content-to-jsx';

export const Figure = ({ content }: { content: FigureContent }) => (
  <figure>
    <label>{content.label}</label>
    {contentToJsx(content.content)}
    <figcaption>{contentToJsx(content.caption)}</figcaption>
  </figure>
);
