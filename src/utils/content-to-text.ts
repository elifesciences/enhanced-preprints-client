import { Content } from '../types/content';

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
    case 'Superscript':
    case 'Subscript':
      return contentToText(content.content);
    default:
      return '';
  }
};
