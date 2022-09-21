import styles from './article-content.module.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types/content';

export const ArticleContent = ({ content }: { content: Content }): JSX.Element => (
  <article className={styles['article-body']}>{contentToJsx(content)}</article>
);
