import '../article-page.scss';
import { Heading } from '../../../atoms/heading/heading';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Content } from '../../../../types/content';

const getFigures = (content: Content): Content => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => getFigures(part));
  }
  switch (content.type) {
    case 'Figure':
      return content;
    default:
      return '';
  }
};

export const ArticleFiguresTab = ({ content }: { content: Content }) => (
  <div className="tabbed-navigation__content">
    <div className="menu-spacer"/>
    <div className="article-body-container">
      <Heading id="figures" headingLevel={2} content="Figures and data" />
      <ArticleContent content={getFigures(content)} />
    </div>
  </div>
);
