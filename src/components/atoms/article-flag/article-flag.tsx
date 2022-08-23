import React from 'react';
import './article-flag.scss';

type Props = {
  flagText: string, isMSA: boolean, url: string
}

export const ArticleFlag = ({flagText, isMSA, url}: Props): JSX.Element => {
  return (
    <li className="article-flags__list_item">
        <a className={'article-flags__link' + (isMSA ? ' article-flags__link-msa' : '')} href={url}>{flagText}</a>
    </li>
  );
};
