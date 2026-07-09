import './article-content.scss';
import { type JSX } from 'react';
import { type JSXContent } from '../../../utils/content';

export const ArticleContent = ({ content }: { content: JSXContent }): JSX.Element => (
  <article className="article-body">{content}</article>
);
