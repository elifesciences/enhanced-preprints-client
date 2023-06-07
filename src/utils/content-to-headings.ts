import { Content, HeadingContent } from '../types';
import { Heading } from '../components/atoms/jump-to-menu/jump-to-menu';

const isHeadingContent = (content: Content): content is HeadingContent => !Array.isArray(content) && typeof content === 'object' && content?.type === 'Heading';

const extractHeadingContentPart = (contentPart: Content): HeadingContent[] => {
  if (isHeadingContent(contentPart)) {
    return [contentPart];
  }

  if (Array.isArray(contentPart)) {
    return contentPart.flatMap(extractHeadingContentPart);
  }

  return [];
};

export const contentToHeadings = (content: Content): Heading[] => {
  const headingContentParts = extractHeadingContentPart(content);

  return headingContentParts.map((heading, index) => ({
    id: (!heading.id || heading.id === '') ? `gen_header_${index}` : heading.id,
    text: heading.content,
  }));
};
