import { JSX } from 'react';
import './article-content.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types';

export const ArticleContent = ({ content }: { content: Content }): JSX.Element => (
  <article className="article-body">{contentToJsx(content)}</article>
);
