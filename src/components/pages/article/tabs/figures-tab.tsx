import '../article-page.scss';
import { Heading } from '../../../atoms/heading/heading';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { JSXContent } from '../../../../utils/content-to-jsx';

export const ArticleFiguresTab = ({ content }: { content: JSXContent }) => (
  <div className="tabbed-navigation__content">
    <div className="menu-spacer"/>
    <div className="article-body-container">
      <Heading id="figures" headingLevel={2} content="Figures and data" />
      <ArticleContent content={content} />
    </div>
  </div>
);
