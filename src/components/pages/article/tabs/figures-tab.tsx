import '../article-page.scss';
import { type JSXContent } from '../../../../utils/content';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Heading } from '../../../atoms/heading/heading';

export const ArticleFiguresTab = ({ content }: { content: JSXContent }) => (
  <div className="tabbed-navigation__content tabbed-navigation__content--figures">
    <div className="menu-spacer"/>
    <div className="article-body-container">
      <Heading id="figures" headingLevel={2} content="Figures and data" />
      <ArticleContent content={content} />
    </div>
  </div>
);
