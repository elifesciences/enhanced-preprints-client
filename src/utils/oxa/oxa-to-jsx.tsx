import { type JSX } from 'react';
import { Heading } from '../../components/atoms/heading/heading';
import type { Block, Inline, Paragraph, Text } from 'oxa-types';

type JSXContentPart = string | JSX.Element | Array<JSXContentPart>;
export type JSXContent = JSXContentPart | Array<JSXContentPart>;
export type Options = {
  maxHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  imgInfo?: Record<string, { width: number, height: number }>,
  removePictureTag?: boolean,
  removeLinkTag?: boolean,
  filesApiPath?: string,
  hostedFileMatcher?: (path: string) => boolean,
};

type CommonOxaNodeProperties = {
  type: string // Required: The node type identifier
  id?: string // Optional: Unique identifier for referencing
  classes?: Array<string> // Optional: Styling or semantic classes
  // biome-ignore lint/suspicious/noExplicitAny: We don't know all K/V
  data?: Record<string, any> // Optional: Arbitrary metadata
  children?: Array<CommonOxaNodeProperties> // Optional: Nested content nodes
};

type InlineImageOxaNode = Omit<CommonOxaNodeProperties, 'type'> & {
  type: "InlineImage"
  url: string
  alt?: string
  encodingFormat?: string
}

type InlineOxaNode = Text | InlineImageOxaNode;

type ImageOxaNode = Omit<CommonOxaNodeProperties, 'type'> & {
  type: "Image"
  url: string
  alt?: string
  encodingFormat?: string
}

type HeadingOxaNode = Omit<CommonOxaNodeProperties, 'children'> & {
  type: 'Heading'
  level: number
  children: Array<InlineOxaNode>
};

type OxaNode = Text | HeadingOxaNode | InlineOxaNode | ImageOxaNode;

export const oxaToJsx = (content?: OxaNode | Array<OxaNode>, options?: Options, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }

  if (Array.isArray(content)) {
    if (content.length < 2) {
      return oxaToJsx(content[0]);
    }
    return content.map((child) => oxaToJsx(child));
  }

  if (content.type === 'Text') {
    return content.value;
  }
  if (content.type === 'InlineImage') {
    return <img src={content.url}></img>;
  }

  if (content.type === 'Image') {
    return <img src={content.url}></img>;
  }
  if (content.type === 'Heading') {
    const level = content.level > 6 ? 6 : content.level < 1 ? 1 : content.level as 1 | 2 | 3 | 4 | 5 | 6;
    return <Heading id={content.id ?? ''} headingLevel={level} content={oxaToJsx(content.children)}></Heading>
  }
  return '';
};
