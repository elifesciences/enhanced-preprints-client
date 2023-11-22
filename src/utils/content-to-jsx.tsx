import { Fragment, JSX } from 'react';
import { Content } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageUrl } from './generate-image-url';
import { Figure } from '../components/atoms/figure/figure';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
export type JSXContent = JSXContentPart | Array<JSXContentPart>;

export const contentToJsx = (content: Content, index?: number, maxHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6, imgInfo?: Record<string, { width: number, height: number }>): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part, i) => contentToJsx(part, i, maxHeadingLevel));
  }
  switch (content.type) {
    case 'Heading':
      return <Heading key={index} id={content.id} content={content.content} headingLevel={content.depth} maxLevel={maxHeadingLevel}/>;
    case 'Cite':
      return <Fragment key={index}><a href={`#${content.target}`}>{ contentToJsx(content.content)}</a></Fragment>;
    case 'CiteGroup':
      return <span key={index}>({content.items.map(async (citeContent, citeIndex) => <a key={citeIndex} href={`#${citeContent.target}`}>{ contentToJsx(citeContent.content)}</a>)})</span>;
    case 'Link':
      return <a key={index} href={content.target}>{ contentToJsx(content.content)}</a>;
    case 'Paragraph':
      return <p key={index}>{ contentToJsx(content.content)}</p>;
    case 'Emphasis':
      return <em key={index}>{ contentToJsx(content.content)}</em>;
    case 'Strong':
      return <strong key={index}>{ contentToJsx(content.content)}</strong>;
    case 'NontextualAnnotation':
      return <u key={index}>{ contentToJsx(content.content)}</u>;
    case 'Superscript':
      return <sup key={index}>{ contentToJsx(content.content)}</sup>;
    case 'Subscript':
      return <sub key={index}>{ contentToJsx(content.content)}</sub>;
    case 'Date':
      return <time key={index}>{ contentToJsx(content.content)}</time>;
    case 'Figure':
      return <Figure key={index} content={content} />;
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }

      // eslint-disable-next-line no-case-declarations
      const additionalProps: Record<string, number> = {};
      // eslint-disable-next-line no-case-declarations
      if (imgInfo) {
        additionalProps['data-original-width'] = imgInfo[content.contentUrl].width;
        additionalProps['data-original-height'] = imgInfo[content.contentUrl].height;
      }

      // eslint-disable-next-line @next/next/no-img-element
      return <picture key={index}>
        <source srcSet={generateImageUrl(content.contentUrl)} />
        <img loading="lazy" {...(content.meta.inline ?
          { className: 'inline-image' } : {})}
          src={generateImageUrl(content.contentUrl)} alt=""
          {...additionalProps}
        />
      </picture>;
    case 'ListItem':
      return <li key={index}>{ contentToJsx(content.content)}</li>;
    case 'List':
      return content.order === 'Ascending' ? <ol key={index}>{ contentToJsx(content.items)}</ol> : <ul key={index}>{ contentToJsx(content.items)}</ul>;
    case 'Claim':
      return (
        <section key={index}>
          {(content.label || content.title) &&
            <h4>{content.label && contentToJsx(content.label)} {content.title && contentToJsx(content.title)}</h4>
          }
          { contentToJsx(content.content)}
        </section>
      );
    default:
      return '';
  }
};
