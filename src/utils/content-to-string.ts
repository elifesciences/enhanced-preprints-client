import { Content } from '../types/content';

export enum ContentType {
  paragraph = 'Paragraph',
  emphasis = 'Emphasis',
  strong = 'Strong',
  subscript = 'Subscript',
  superscript = 'Superscript',
}

type ContentTypeTag = {
  id: ContentType,
  tag: string,
};

export const contentToString = (content: Content, contentTypeTags?: ContentTypeTag[]): string => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => contentToString(part, contentTypeTags)).join('');
  }
  switch (content.type) {
    case ContentType.paragraph:
    case ContentType.emphasis:
    case ContentType.strong:
    case ContentType.subscript:
    case ContentType.superscript:
      const tag = contentTypeTags?.find((typeTag) => typeTag.id === content.type)?.tag; // eslint-disable-line no-case-declarations
      return (tag ? `<${tag}>` : '') + contentToString(content.content, contentTypeTags) + (tag ? `</${tag}>` : '');
    default:
      return '';
  }
};
