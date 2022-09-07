import './article-status.scss';
import { Button } from '../../atoms/button/button';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus?: string,
};

const defaultArticleType = 'Reviewed Preprint';
const defaultArticleStatus = 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition';

export const ArticleStatus = ({ articleType = defaultArticleType, articleStatus = defaultArticleStatus }: ArticleStatusProps): JSX.Element => (
  <div className="article-status">
    <h2 className="article-status__heading">{articleType}</h2>
    <p className="article-status__text">{articleStatus}</p>
    <ul className="article-actions">
      <li className="article-actions__list-item">
        <Button text="Download" iconName="download" />
      </li>
      <li className="article-actions__list-item">
        <Button text="Cite" iconName="format_quote" />
      </li>
      <li className="article-actions__list-item">
        <Button text="Follow" iconName="notifications" />
      </li>
      <li className="article-actions__list-item">
        <Button text="Share" iconName="share" />
      </li>
    </ul>
  </div>
);
