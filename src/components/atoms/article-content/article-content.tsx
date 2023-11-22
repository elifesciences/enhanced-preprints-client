import './article-content.scss';
import { JSXContent } from '../../../utils/content-to-jsx';

export const ArticleContent = ({ content }: { content: Promise<JSXContent> }) => (
  <article className="article-body">{content}</article>
);
