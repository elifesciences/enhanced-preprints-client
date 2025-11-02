import './article-content.scss';
import { type JSXContent } from '../../../utils/content';

export const ArticleContent = ({ content }: { content: JSXContent }) => (
  <article className="article-body">{content}</article>
);
