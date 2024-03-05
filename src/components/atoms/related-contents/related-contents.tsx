import './related-contents.scss';

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
  <ul className="related-contents">
    {articles.map(({
      type, content, title, url, imageUrl,
    }, index) => (
      <li key={`related-contents-${index}`} className="related-contents__item">
        <header>
          <div className="related-contents__item-type">{type}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {imageUrl && <img src={imageUrl} alt="related content thumbnail"/> }
          <h4 className="related-contents__item-title"><a className="related-contents__item-link" href={url}>{title}</a></h4>
        </header>
        {content && <div className="related-contents__item-content">{content}</div>}
      </li>
    ))}
  </ul>
);
