import { type Content, type HeadingContent } from '../../types';

export type Heading = {
  id: string,
  text: Content,
};

export const contentToHeadings = (content: Content): Heading[] => {
  if (typeof content === 'string') {
    return [];
  }

  if (!Array.isArray(content)) {
    return contentToHeadings([content]);
  }

  const headingContentParts = content.filter((contentPart) => {
    if (typeof contentPart === 'string') {
      return false;
    }

    if (Array.isArray(contentPart)) {
      return contentToHeadings(content);
    }

    if (contentPart.type !== 'Heading') {
      return false;
    }

    return contentPart.depth <= 1;
  });

  return headingContentParts.map((contentPart) => {
    const heading = contentPart as HeadingContent;
    return {
      id: heading.id,
      text: heading.content,
    };
  });
};
