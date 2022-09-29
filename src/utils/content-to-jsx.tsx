import { Content } from '../types/content';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageUrl } from './generate-image-url';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
type JSXContent = JSXContentPart | Array<JSXContentPart>;

export const contentToJsx = (content: Content, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part, i) => contentToJsx(part, i));
  }
  switch (content.type) {
    case 'Heading':
      return <Heading id={content.id} content={content.content} headingLevel={content.depth}/>;
    case 'Cite':
    case 'Link':
      return <a key={index} href={content.target}>{contentToJsx(content.content)}</a>;
    case 'Paragraph':
      return <p key={index}>{contentToJsx(content.content)}</p>;
    case 'Emphasis':
      return <em key={index}>{contentToJsx(content.content)}</em>;
    case 'Strong':
      return <strong key={index}>{contentToJsx(content.content)}</strong>;
    case 'Superscript':
      return <sup key={index}>{contentToJsx(content.content)}</sup>;
    case 'Subscript':
      return <sub key={index}>{contentToJsx(content.content)}</sub>;
    case 'Date':
      return <time key={index}>{contentToJsx(content.content)}</time>;
    case 'Figure':
      return (
        <figure key={index}>
          <label>{content.label}</label>
          {contentToJsx(content.content)}
          <figcaption>{contentToJsx(content.caption)}</figcaption>
        </figure>
      );
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }
      return <img key={index} src={generateImageUrl(content.contentUrl)} alt={'sciency picture'}></img>;
    default:
      return '';
  }
};
