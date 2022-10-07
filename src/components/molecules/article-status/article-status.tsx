import { Button } from '../../atoms/button/button';
import styles from './article-status.module.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus: string,
};

const defaultArticleType = 'Reviewed Preprint';

export const ArticleStatus = ({ articleType = defaultArticleType, articleStatus }: ArticleStatusProps): JSX.Element => (
  <div className={styles['article-status']}>
    <h2 className={styles['article-status__heading']}>{articleType}</h2>
    <p className={styles['article-status__text']}>{articleStatus}</p>
    <ul className={styles['article-actions']}>
      <li className={styles['article-actions__list-item']}>
        <Button text="Download" iconName="download" />
      </li>
    </ul>
  </div>
);
