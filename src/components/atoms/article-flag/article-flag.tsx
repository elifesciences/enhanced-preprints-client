import styles from './article-flag.module.scss';

type Props = {
  flagText: string, url: string
};

export const ArticleFlag = ({ flagText, url }: Props): JSX.Element => (
  <a className={styles['article-flag__link']} href={url}>{flagText}</a>
);
