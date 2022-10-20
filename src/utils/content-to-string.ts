import { Content } from '../types/content';

export const contentToString = (content: Content): string => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => contentToString(part)).join('');
  }
  switch (content.type) {
    case 'Paragraph':
    case 'Emphasis':
    case 'Strong':
    case 'Superscript':
    case 'Subscript':
      return contentToString(content.content);
    default:
      return '';
  }
};
