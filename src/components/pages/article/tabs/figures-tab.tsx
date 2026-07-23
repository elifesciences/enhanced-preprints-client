import { type JSX } from 'react';
import '../article-page.scss';
import { type JSXContent } from '../../../../content';
import { ArticleContent } from '../../../atoms/article-content/article-content';

export const ArticleFiguresTab = ({ content }: { content: JSXContent }): JSX.Element => (
  <div className="tabbed-navigation__content tabbed-navigation__content--figures">
    <div className="menu-spacer"/>
    <div className="article-body-container">
      <h2 id="figures" className="heading-2">Figures and data</h2>
      <ArticleContent content={content} />
    </div>
  </div>
);
