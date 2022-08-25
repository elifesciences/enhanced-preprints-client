import './title.scss';

type DecoratedContent = {
  content: string | DecoratedContent | Array<DecoratedContent | string>,
  type: string,
};

type Content = string | DecoratedContent | Array<Content>;

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
export type JSXContent = JSXContentPart | Array<JSXContentPart>;

export const contentToJsx = (content: Content): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  // array of string or DecoratedContent, so just map back to this function
  if (Array.isArray(content)) {
    return content.map(contentToJsx);
  }
  switch (content.type) {
    case 'Emphasis':
      return <em>{contentToJsx(content.content)}</em>;
    case 'Strong':
      return <strong>{contentToJsx(content.content)}</strong>;
    case 'Superscript':
      return <sup>{contentToJsx(content.content)}</sup>;
    case 'Subscript':
      return <sub>{contentToJsx(content.content)}</sub>;
    case 'Date':
      return <time>{contentToJsx(content.content)}</time>;
    default:
      // TODO: log unimplemented type
      return <span>{contentToJsx(content.content)}</span>;
  }
};

export const Title = ({ title }: { title: Content }): JSX.Element => (
  <h1 className="title">{contentToJsx(title)}</h1>
);
