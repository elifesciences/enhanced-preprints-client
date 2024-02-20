type RelatedContent = {
  type: string,
  title: string,
  url: string,
  content?: string,
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
      type, content, title, url,
    }, index) => (
      <li key={`related-contents-${index}`} className="related-contents__item">
        <header>
          <div>{types[type]}</div>
          <h4><a href={url}>{title}</a></h4>
        </header>
        {content && <div>{content}</div>}
      </li>
    ))}
  </ul>
);
