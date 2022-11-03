import styles from '../article-page-layout.module.scss';
import { Heading } from '../../../atoms/heading/heading';
import { ArticleContent } from '../../../atoms/article-content/article-content';
import { Content } from '../../../../types/content';

export const ArticleFiguresTab = ({ content }: { content: Content }): JSX.Element => (
  <div className={styles['tabbed-navigation__content']}>
    <div className={styles['menu-spacer']}/>
    <div className={styles['article-body-container']}>
      <Heading id="figures" headingLevel={2} content="Figures and data" />
      <ArticleContent content={content} />
    </div>
  </div>
);
