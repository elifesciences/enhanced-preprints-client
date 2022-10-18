import { Button } from '../../atoms/button/button';
import styles from './article-status.module.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus: string,
  pdfUrl: string,
};

const defaultArticleType = 'Reviewed Preprint';

export const ArticleStatus = ({ articleType = defaultArticleType, articleStatus, pdfUrl }: ArticleStatusProps): JSX.Element => (
  <div className={styles['article-status']}>
    <h2 className={styles['article-status__heading']}>{articleType}</h2>
    <p className={styles['article-status__text']}>{articleStatus}</p>
    <a href="https://elifesciences.org/peer-review-process" className={styles['article-status__link']}>About eLife&apos;s process</a>
    <ul className={styles['article-actions']}>
      <li className={styles['article-actions__list-item']}>
        <Button text="Download" iconName="download" url={pdfUrl}/>
      </li>
    </ul>
  </div>
);
