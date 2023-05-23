import { Fragment } from 'react';
import { Content } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageUrl } from './generate-image-url';
import { Figure } from '../components/atoms/figure/figure';

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
      return <Heading key={index} id={content.id} content={content.content} headingLevel={content.depth}/>;
    case 'Cite':
      return <Fragment key={index}>(<a href={`#${content.target}`}>{contentToJsx(content.content)}</a>)</Fragment>;
    case 'CiteGroup':
      return <span key={index}>({content.items.map((citeContent, citeIndex) => <a key={citeIndex} href={`#${citeContent.target}`}>{contentToJsx(citeContent.content)}</a>)})</span>;
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
      return <Figure key={index} content={content} />;
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }
      return <img loading="lazy" {...(content.meta.inline ? { className: 'inline-image' } : {})} key={index} src={generateImageUrl(content.contentUrl)}></img>;
    case 'ListItem':
      return <li key={index}>{contentToJsx(content.content)}</li>;
    case 'List':
      return content.order === 'Ascending' ? <ol key={index}>{contentToJsx(content.items)}</ol> : <ul key={index}>{contentToJsx(content.items)}</ul>;
    case 'Claim':
      return (
        <section key={index}>
          {(content.label || content.title) &&
            <h4>{content.label && contentToJsx(content.label)} {content.title && contentToJsx(content.title)}</h4>
          }
          {contentToJsx(content.content)}
        </section>
      );
    default:
      return '';
  }
};
