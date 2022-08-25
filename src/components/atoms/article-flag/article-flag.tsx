import './article-flag.scss';

type Props = {
  flagText: string, isMSA: boolean, url: string
};

export const ArticleFlag = ({ flagText, isMSA, url }: Props): JSX.Element => (
  <a className={`article-flag__link${isMSA ? ' article-flag__link-msa' : ''}`} href={url}>{flagText}</a>
);
