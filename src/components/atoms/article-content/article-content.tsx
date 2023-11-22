import './article-content.scss';
import { JSXContent } from '../../../utils/content-to-jsx';

export const ArticleContent = ({ content }: { content: JSXContent }) => (
  <article className="article-body">{content}</article>
);
