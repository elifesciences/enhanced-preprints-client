import './article-content.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types';

export const ArticleContent = ({ content }: { content: Content }) => (
  <article className="article-body">{contentToJsx(content)}</article>
);
