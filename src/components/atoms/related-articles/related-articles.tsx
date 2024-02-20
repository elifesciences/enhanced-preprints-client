type RelatedArticle = {
  type: string,
  title: string,
  url: string,
  content?: string,
};

type RelatedArticlesProps = {
  articles: RelatedArticle[]
};

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => (
  <ul className="related-articles">
    {articles.map(({
      type, content, title, url,
    }, index) => (
      <li key={`related-article-${index}`} className="related-articles__item">
        <header>
          <div>Related {type}</div>
          <h4><a href={url}>{title}</a></h4>
        </header>
        {content && <div>{content}</div>}
      </li>
    ))}
  </ul>
);
