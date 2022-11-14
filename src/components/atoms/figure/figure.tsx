import { contentToJsx } from '../../../utils/content-to-jsx';
import styles from './figure.module.scss';
import { FigureContent } from '../../../types';

export const Figure = ({ content }: { content: FigureContent }) => (
  <figure className={styles.figure} id={content.id}>
    <label className={styles.figure__label}>{content.label}</label>
    {contentToJsx(content.content)}
    <figcaption className={styles.figure__caption}>{contentToJsx(content.caption)}</figcaption>
  </figure>
);
