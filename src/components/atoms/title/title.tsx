import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types';
import styles from './title.module.scss';

export const Title = ({ title }: { title: Content }): JSX.Element => (
  <h1 className={styles.title}>{contentToJsx(title)}</h1>
);
