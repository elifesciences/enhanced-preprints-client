import { marked } from 'marked';
import styles from './review-content.module.scss';

export const ReviewContent = ({ content }: { content: string }): JSX.Element => (
  <section className={styles['review-content']} dangerouslySetInnerHTML={{ __html: marked.parse(content) }}></section>
);
