import './article-flag.scss';
import { type JSX } from 'react';

type Props = {
  flagText: string, url: string
};

export const ArticleFlag = ({ flagText, url }: Props): JSX.Element => (
  <a className="article-flag__link" href={url}>{flagText}</a>
);
