import { Button } from '../../atoms/button/button';
import styles from './article-status.module.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus?: string,
};

const defaultArticleType = 'Reviewed Preprint';
const defaultArticleStatus = 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition';

export const ArticleStatus = ({ articleType = defaultArticleType, articleStatus = defaultArticleStatus }: ArticleStatusProps): JSX.Element => (
  <div className={styles['article-status']}>
    <h2 className={styles['article-status__heading']}>{articleType}</h2>
    <p className={styles['article-status__text']}>{articleStatus}</p>
    <ul className={styles['article-actions']}>
      <li className={styles['article-actions__list-item']}>
        <Button text="Download" iconName="download" />
      </li>
      <li className={styles['article-actions__list-item']}>
        <Button text="Cite" iconName="format_quote" />
      </li>
      <li className={styles['article-actions__list-item']}>
        <Button text="Follow" iconName="notifications" />
      </li>
      <li className={styles['article-actions__list-item']}>
        <Button text="Share" iconName="share" />
      </li>
    </ul>
  </div>
);
