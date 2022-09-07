import './article-status.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus?: string,
};

const defaultArticleType = 'Reviewed Preprint';
const defaultArticleStatus = 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition';

export const ArticleStatus = ({ articleType = defaultArticleType, articleStatus = defaultArticleStatus}: ArticleStatusProps): JSX.Element => (
  <div className="article-status">
    <h2 className="article-status__heading">{articleType}</h2>
    <p className="article-status__text">{articleStatus}</p>
    <ul className="article-actions">
      <li className="article-actions__list-item">
        <div className="article-actions__button"><span
          className="material-icons article-actions__button_icon">download</span>Download</div>
      </li>
      <li className="article-actions__list-item">
        <div className="article-actions__button"><span
          className="material-icons article-actions__button_icon">format_quote</span>Cite</div>
      </li>
      <li className="article-actions__list-item">
        <div className="article-actions__button"><span
          className="material-icons article-actions__button_icon">notifications</span>Follow</div>
      </li>
      <li className="article-actions__list-item">
        <div className="article-actions__button"><span
          className="material-icons article-actions__button_icon">share</span>Share</div>
      </li>
    </ul>
  </div>
);
