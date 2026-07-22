import { type Content } from './content';

export const contentToText = (content: Content): string => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => contentToText(part)).join('');
  }
  switch (content.type) {
    case 'Paragraph':
    case 'Emphasis':
    case 'Strong':
    case 'NontextualAnnotation':
    case 'Superscript':
    case 'Subscript':
      return contentToText(content.content);
    case 'Heading':
    case 'Date':
    case 'Link':
    case 'Cite':
    case 'CiteGroup':
    case 'Figure':
    case 'ImageObject':
    case 'ListItem':
    case 'List':
    case 'Claim':
    case 'ThematicBreak':
      return '';
    default:
      return '';
  }
};
