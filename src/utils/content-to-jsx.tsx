import { Fragment, JSX } from 'react';
import { Content } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageInfo, generateImageUrl } from './generate-image-url';
import { Figure } from '../components/atoms/figure/figure';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
type JSXContent = JSXContentPart | Array<JSXContentPart>;

export const contentToJsx = async (content: Content, index?: number, maxHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6): Promise<JSXContent> => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return Promise.all(content.map(async (part, i) => contentToJsx(part, i, maxHeadingLevel)));
  }
  switch (content.type) {
    case 'Heading':
      return <Heading key={index} id={content.id} content={content.content} headingLevel={content.depth} maxLevel={maxHeadingLevel}/>;
    case 'Cite':
      return <Fragment key={index}><a href={`#${content.target}`}>{await contentToJsx(content.content)}</a></Fragment>;
    case 'CiteGroup':
      return <span key={index}>({content.items.map(async (citeContent, citeIndex) => <a key={citeIndex} href={`#${citeContent.target}`}>{await contentToJsx(citeContent.content)}</a>)})</span>;
    case 'Link':
      return <a key={index} href={content.target}>{await contentToJsx(content.content)}</a>;
    case 'Paragraph':
      return <p key={index}>{await contentToJsx(content.content)}</p>;
    case 'Emphasis':
      return <em key={index}>{await contentToJsx(content.content)}</em>;
    case 'Strong':
      return <strong key={index}>{await contentToJsx(content.content)}</strong>;
    case 'NontextualAnnotation':
      return <u key={index}>{await contentToJsx(content.content)}</u>;
    case 'Superscript':
      return <sup key={index}>{await contentToJsx(content.content)}</sup>;
    case 'Subscript':
      return <sub key={index}>{await contentToJsx(content.content)}</sub>;
    case 'Date':
      return <time key={index}>{await contentToJsx(content.content)}</time>;
    case 'Figure':
      return <Figure key={index} content={content} />;
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }

      // eslint-disable-next-line no-case-declarations
      const imageSizes = await generateImageInfo(content.contentUrl);

      // eslint-disable-next-line @next/next/no-img-element
      return <picture key={index}>
        <source srcSet={generateImageUrl(content.contentUrl)} />
        <img loading="lazy" {...(content.meta.inline ?
          { className: 'inline-image' } : {})}
          src={generateImageUrl(content.contentUrl)} alt=""
          data-original-width={imageSizes.width}
          data-original-height={imageSizes.height} />
      </picture>;
    case 'ListItem':
      return <li key={index}>{await contentToJsx(content.content)}</li>;
    case 'List':
      return content.order === 'Ascending' ? <ol key={index}>{await contentToJsx(content.items)}</ol> : <ul key={index}>{await contentToJsx(content.items)}</ul>;
    case 'Claim':
      return (
        <section key={index}>
          {(content.label || content.title) &&
            <h4>{content.label && await contentToJsx(content.label)} {content.title && await contentToJsx(content.title)}</h4>
          }
          {await contentToJsx(content.content)}
        </section>
      );
    default:
      return '';
  }
};
