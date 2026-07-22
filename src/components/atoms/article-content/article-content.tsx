import './article-content.scss';
import { type JSX } from 'react';
import { type JSXContent } from '../../../content';

export const ArticleContent = ({ content }: { content: JSXContent }): JSX.Element => (
  <article className="article-body">{content}</article>
);
