import { Content } from '../types/content';
import { Heading } from '../components/atoms/heading/heading';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
type JSXContent = JSXContentPart | Array<JSXContentPart>;

export const contentToJsx = (content: Content): JSXContent => {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map(contentToJsx);
  }
  switch (content.type) {
    case 'Heading':
      return <Heading id={content.id} content={content.content} headingLevel={content.depth}/>;
    case 'Cite':
    case 'Link':
      return <a href={content.target}>{contentToJsx(content.content)}</a>;
    case 'Paragraph':
      return <p>{contentToJsx(content.content)}</p>;
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
    case 'Figure':
      return (
        <figure>
          <label>{content.label}</label>
          {contentToJsx(content.content)}
          <figcaption>{contentToJsx(content.caption)}</figcaption>
        </figure>
      );
    case 'ImageObject':
      return <img src={'https://placekitten.com/500/300'} alt={'cat picture'}></img>;
    default:
      return '';
  }
};
