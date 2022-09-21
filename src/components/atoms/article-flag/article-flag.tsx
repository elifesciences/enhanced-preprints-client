import styles from './article-flag.module.scss';

type Props = {
  flagText: string, isMSA: boolean, url: string
};

export const ArticleFlag = ({ flagText, isMSA, url }: Props): JSX.Element => (
  <a className={`${styles['article-flag__link']}${isMSA ? ` ${styles['article-flag__link-msa']}` : ''}`} href={url}>{flagText}</a>
);
