import { Fragment, JSX } from 'react';
import { Content } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageUrl } from './generate-image-url';
import { Figure } from '../components/atoms/figure/figure';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
export type JSXContent = JSXContentPart | Array<JSXContentPart>;

export const contentToJsx = (content?: Content, index?: number, maxHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6, imgInfo?: Record<string, { width: number, height: number }>): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part, i) => contentToJsx(part, i, maxHeadingLevel, imgInfo));
  }
  switch (content.type) {
    case 'Heading':
      return <Heading key={index} id={content.id} content={content.content} headingLevel={content.depth} maxLevel={maxHeadingLevel}/>;
    case 'Cite':
      return <Fragment key={index}><a href={`#${content.target}`}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</a></Fragment>;
    case 'CiteGroup':
      return <span key={index}>({content.items.map(async (citeContent, citeIndex) => <a key={citeIndex} href={`#${citeContent.target}`}>{ contentToJsx(citeContent.content, undefined, undefined, imgInfo)}</a>)})</span>;
    case 'Link':
      return <a key={index} href={content.target}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</a>;
    case 'Paragraph':
      return <p key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</p>;
    case 'Emphasis':
      return <em key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</em>;
    case 'Strong':
      return <strong key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</strong>;
    case 'NontextualAnnotation':
      return <u key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</u>;
    case 'Superscript':
      return <sup key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</sup>;
    case 'Subscript':
      return <sub key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</sub>;
    case 'Date':
      return <time key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</time>;
    case 'Figure':
      return <Figure key={index} id={content.id} caption={contentToJsx(content.caption, undefined, 4, imgInfo)} label={content.label} content={contentToJsx(content.content, undefined, undefined, imgInfo)} />;
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }

      console.log('jsx img info', imgInfo);

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
      return <li key={index}>{ contentToJsx(content.content, undefined, undefined, imgInfo)}</li>;
    case 'List':
      return content.order === 'Ascending' ? <ol key={index}>{ contentToJsx(content.items, undefined, undefined, imgInfo)}</ol> : <ul key={index}>{ contentToJsx(content.items, undefined, undefined, imgInfo)}</ul>;
    case 'Claim':
      return (
        <section key={index}>
          {(content.label || content.title) &&
            <h4>{content.label && contentToJsx(content.label, undefined, undefined, imgInfo)} {content.title && contentToJsx(content.title, undefined, undefined, imgInfo)}</h4>
          }
          { contentToJsx(content.content, undefined, undefined, imgInfo)}
        </section>
      );
    default:
      return '';
  }
};
