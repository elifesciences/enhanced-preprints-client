import './related-contents.scss';

type RelatedContent = {
  type: string,
  title: string,
  url: string,
  content?: string,
  imageUrl?: string,
};

type RelatedContentsProps = {
  articles: RelatedContent[]
};

const types: Record<string, string> = {
  collections: 'Is part of',
  podcast: 'Discussed in',
  'focus-issue': 'Is part of',
  insight: 'Related Insight',
};

export const RelatedContents = ({ articles }: RelatedContentsProps) => (
  <ul className="related-contents">
    {articles.map(({
      type, content, title, url, imageUrl,
    }, index) => (
      <li key={`related-contents-${index}`} className="related-contents__item">
        <header>
          <div className="related-contents__item-type">{types[type]}</div>
          <h4 className="related-contents__item-title"><a href={url}>{title}</a></h4>
        </header>
        {content && <div>{content}</div>}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {imageUrl && <img src={imageUrl} alt="related content thumbnail"/> }
      </li>
    ))}
  </ul>
);
