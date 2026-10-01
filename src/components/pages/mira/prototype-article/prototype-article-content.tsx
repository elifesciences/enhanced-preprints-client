import {
  contentToJsx, contentToText, type Content, type JSXContent,
} from '../../../../content';
import { type HeadingContent } from '../../../../content/content';
import { TextCapsule } from '../../../molecules/mira/text-capsule/text-capsule';

type Options = Parameters<typeof contentToJsx>[1];

type Capsule = {
  text: string,
  href: string,
};

// Keyed by the id of the heading of the section the capsule belongs to.
const capsules: Record<string, Capsule> = {
  s2a2: { text: 'Claim 2 generated from this text', href: '/mira/claims-tree/claim/2' },
  s2b: { text: 'Claim 1 generated from this text', href: '/mira/claims-tree/claim/1' },
  s2b3: { text: 'Claim 3 generated from this text', href: '/mira/claims-tree/claim/3' },
};

const isOfType = (part: Content, type: string) => typeof part === 'object' && 'type' in part && part.type === type;

const isHeading = (part: Content): part is HeadingContent => isOfType(part, 'Heading');

// A capsule goes after the last paragraph of its section, before any figures or subsections.
const findCapsulePositions = (content: Content[]): Map<number, Capsule> => {
  const positions = new Map<number, Capsule>();

  content.forEach((part, index) => {
    if (!isHeading(part) || !part.id || !capsules[part.id]) {
      return;
    }

    const nextHeadingIndex = content.findIndex((nextPart, nextIndex) => nextIndex > index && isHeading(nextPart));
    const sectionParts = content.slice(index + 1, nextHeadingIndex >= 0 ? nextHeadingIndex : content.length);
    const lastParagraphIndex = sectionParts.findLastIndex((sectionPart) => isOfType(sectionPart, 'Paragraph'));

    positions.set(index + 1 + lastParagraphIndex, capsules[part.id]);
  });

  return positions;
};

// Copy of the top-level array handling in contentToJsx, with capsules inserted into the relevant sections.
export const prototypeArticleContentToJsx = (content: Content, options?: Options): JSXContent => {
  if (!Array.isArray(content)) {
    return contentToJsx(content, options);
  }

  const capsulePositions = findCapsulePositions(content);

  const renderParts = (indexes: number[]): JSXContent[] => {
    const parts: JSXContent[] = [];
    indexes.forEach((index) => {
      parts.push(contentToJsx(content[index], options, index));

      const capsule = capsulePositions.get(index);
      if (capsule) {
        parts.push(<TextCapsule key={`capsule-${index}`} text={capsule.text} href={capsule.href} />);
      }
    });

    return parts;
  };

  const slices: number[][] = [[]];
  content.forEach((part, index) => {
    if (isOfType(part, 'ThematicBreak')) {
      slices.push([]);

      return;
    }

    slices[slices.length - 1].push(index);
  });

  if (slices.length === 1) {
    return renderParts(slices[0]);
  }

  return slices
    .filter((slice) => slice.length)
    .map((slice, i) => {
      const firstPart = content[slice[0]];
      let sectionId = `section-${i}`;
      if (isHeading(firstPart) && firstPart.depth === 1) {
        sectionId = contentToText(firstPart.content)
          .replaceAll(/[^a-zA-Z0-9\s]/g, '')
          .replaceAll(/\s/g, '-')
          .toLowerCase();
      }

      return <section key={i} id={sectionId}>{renderParts(slice)}</section>;
    });
};
