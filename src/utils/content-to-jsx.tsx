import { Fragment, JSX } from 'react';
import { Content } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageUrl } from './generate-image-url';
import { Figure } from '../components/atoms/figure/figure';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
export type JSXContent = JSXContentPart | Array<JSXContentPart>;
type Options = {
  maxHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  imgInfo?: Record<string, { width: number, height: number }>
}

export const contentToJsx = (content?: Content, options?: Options, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part, i) => contentToJsx(part, options, i));
  }
  switch (content.type) {
    case 'Heading':
      return <Heading key={index} id={content.id} content={content.content} headingLevel={content.depth} maxLevel={options?.maxHeadingLevel}/>;
    case 'Cite':
      return <Fragment key={index}><a href={`#${content.target}`}>{ contentToJsx(content.content, options)}</a></Fragment>;
    case 'CiteGroup':
      return <span key={index}>({content.items.map(async (citeContent, citeIndex) => <a key={citeIndex} href={`#${citeContent.target}`}>{ contentToJsx(citeContent.content, options)}</a>)})</span>;
    case 'Link':
      return <a key={index} href={content.target}>{ contentToJsx(content.content, options)}</a>;
    case 'Paragraph':
      return <p key={index}>{ contentToJsx(content.content, options)}</p>;
    case 'Emphasis':
      return <em key={index}>{ contentToJsx(content.content, options)}</em>;
    case 'Strong':
      return <strong key={index}>{ contentToJsx(content.content, options)}</strong>;
    case 'NontextualAnnotation':
      return <u key={index}>{ contentToJsx(content.content, options)}</u>;
    case 'Superscript':
      return <sup key={index}>{ contentToJsx(content.content, options)}</sup>;
    case 'Subscript':
      return <sub key={index}>{ contentToJsx(content.content, options)}</sub>;
    case 'Date':
      return <time key={index}>{ contentToJsx(content.content, options)}</time>;
    case 'Figure':
      return <Figure key={index} id={content.id} caption={contentToJsx(content.caption, { ...options, maxHeadingLevel: 4 })} label={content.label} content={contentToJsx(content.content, options)} />;
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }

      // eslint-disable-next-line no-case-declarations
      const additionalProps: Record<string, number> = {};
      // eslint-disable-next-line no-case-declarations
      if (options?.imgInfo) {
        additionalProps['data-original-width'] = options?.imgInfo[content.contentUrl].width;
        additionalProps['data-original-height'] = options?.imgInfo[content.contentUrl].height;
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
      return <li key={index}>{ contentToJsx(content.content, options)}</li>;
    case 'List':
      return content.order === 'Ascending' ? <ol key={index}>{ contentToJsx(content.items, options)}</ol> : <ul key={index}>{ contentToJsx(content.items, options)}</ul>;
    case 'Claim':
      return (
        <section key={index}>
          {(content.label || content.title) &&
            <h4>{content.label && contentToJsx(content.label, options)} {content.title && contentToJsx(content.title, options)}</h4>
          }
          { contentToJsx(content.content, options)}
        </section>
      );
    default:
      return '';
  }
};
