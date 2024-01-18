import { Fragment, JSX } from 'react';
import { Content, FigureContent } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { generateImageUrl } from './generate-image-url';
import { Figure } from '../components/atoms/figure/figure';
import { contentToText } from './content-to-text';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
export type JSXContent = JSXContentPart | Array<JSXContentPart>;
type Options = {
  maxHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  imgInfo?: Record<string, { width: number, height: number }>,
  removePictureTag?: boolean,
  altText?: string,
};

const figureToAltText = (figure: FigureContent): string | undefined => {
  if (figure.caption) {
    return contentToText(figure.caption);
  }
  if (figure.label) {
    return contentToText(figure.label);
  }
  return undefined;
};

export const contentToJsx = (content?: Content, options?: Options, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  const isThematicBreak = (contentPart: Content) => typeof contentPart === 'object' && 'type' in contentPart && contentPart.type === 'ThematicBreak';

  if (Array.isArray(content)) {
    const thematicBreakIndex = content.findIndex(isThematicBreak);

    if (thematicBreakIndex >= 0) {
      const slices: Content[][] = [[]];
      content.forEach((part) => {
        if (isThematicBreak(part)) {
          slices.push([]);

          return;
        }

        slices[slices.length - 1].push(part);
      });

      const allSections = slices
        .filter((slice) => slice.length)
        .map((slice, i) => {
          let sectionId = `section-${i}`;
          if (Array.isArray(slice) && typeof slice[0] === 'object' && 'type' in slice[0] && slice[0].type === 'Heading' && slice[0].depth === 1) {
            sectionId = contentToText(slice[0].content)
              .replaceAll(/[^a-zA-Z0-9\s]/g, '')
              .replaceAll(/\s/g, '-')
              .toLowerCase();
          }

          return <section key={i} id={sectionId}>{contentToJsx(slice, options)}</section>;
        });

      return allSections;
    }

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
    case 'Figure': {
      return <Figure
        key={index}
        id={content.id}
        caption={contentToJsx(content.caption, { ...options, maxHeadingLevel: 4 })}
        label={content.label}
        content={contentToJsx(content.content, { ...options, altText: figureToAltText(content) })}
      />;
    }
    case 'ImageObject':
      if (!content.contentUrl) {
        return '';
      }

      // eslint-disable-next-line no-case-declarations
      const additionalProps: Record<string, number> = {};
      // eslint-disable-next-line no-case-declarations
      if (options?.imgInfo && options?.imgInfo[content.contentUrl] !== undefined) {
        additionalProps['data-original-width'] = options?.imgInfo[content.contentUrl].width;
        additionalProps['data-original-height'] = options?.imgInfo[content.contentUrl].height;
      }

      {
        // eslint-disable-next-line @next/next/no-img-element
        const image = <img loading="lazy" {...(content.meta.inline ?
          { className: 'inline-image' } : {})}
          src={generateImageUrl(content.contentUrl)}
          alt={ options?.altText ?? '' }
          {...additionalProps}
        />;

        if (options?.removePictureTag) {
          return image;
        }

        return <picture key={index}>
          <source srcSet={generateImageUrl(content.contentUrl)} />
          {image}
        </picture>;
      }
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
