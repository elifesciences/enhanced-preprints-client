import { type Content } from '../../types';

export const contentToFigures = (content: Content): Content => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => contentToFigures(part));
  }
  if (content.type === 'Figure') {
    return content;
  } else {
    return '';
  }
};
