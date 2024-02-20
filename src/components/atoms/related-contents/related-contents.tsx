type RelatedContent = {
  type: string,
  title: string,
  url: string,
  content?: string,
};

type RelatedContentsProps = {
  articles: RelatedContent[]
};

export const RelatedContents = ({ articles }: RelatedContentsProps) => (
  <ul className="related-contents">
    {articles.map(({
      type, content, title, url,
    }, index) => (
      <li key={`related-contents-${index}`} className="related-contents__item">
        <header>
          <div>Related {type}</div>
          <h4><a href={url}>{title}</a></h4>
        </header>
        {content && <div>{content}</div>}
      </li>
    ))}
  </ul>
);
