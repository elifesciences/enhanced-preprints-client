import './related-content.scss';

export type RelatedContentData = {
  type: string,
  title: string,
  url: string,
  content?: string,
  imageUrl?: string,
};

type RelatedContentProps = {
  articles: RelatedContentData[]
};

export const RelatedContent = ({ articles }: RelatedContentProps) => (
  <ul className="related-content">
    {articles.map(({
      type, content, title, url,
    }, index) => (
      <li key={`related-content-${index}`} className="related-content__item">
        <header>
          <div className="related-content__item-type">{type}</div>
          <h4 className="related-content__item-title"><a className="related-content__item-link" href={url}>{title}</a></h4>
        </header>
        {content && <div className="related-content__item-content">{content}</div>}
      </li>
    ))}
  </ul>
);
