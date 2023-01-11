import { Button } from '../../atoms/button/button';
import './article-status.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus: string,
  pdfUrl: string,
};

const defaultArticleType = 'Reviewed Preprint';

export const ArticleStatus = ({ articleType = defaultArticleType, articleStatus, pdfUrl }: ArticleStatusProps): JSX.Element => (
  <div className="article-status">
    <h2 className="article-status__heading">{articleType}</h2>
    <p className="article-status__text">{articleStatus}</p>
    <a href="https://elifesciences.org/peer-review-process" className="article-status__link">About eLife&apos;s process</a>
    <ul className="article-actions">
      <li className="article-actions__list-item">
        <Button text="Download" iconName="download" variant="action" url={pdfUrl}/>
      </li>
    </ul>
  </div>
);
