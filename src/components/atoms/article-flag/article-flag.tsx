import React from 'react';
import './article-flag.scss';

export const ArticleFlag = ({flagText, isMSA}: {flagText: string, isMSA: boolean}): JSX.Element => {
  return (
    <li className="article-flags__list_item">
        <a className={'article-flags__link' + isMSA ? 'article-flags__link-msa' : ''}>{flagText}</a>
    </li>
  );
};
