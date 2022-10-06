import styles from './abstract.module.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types/content';

export const Abstract = ({ content }: { content: Content }): JSX.Element => (
  <section className={styles.abstract}>
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
  </section>
);
