import { type JSX } from 'react';
import { Heading } from '../../components/atoms/heading/heading';

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

type OxaNode = {
  type: string // Required: The node type identifier
  id?: string // Optional: Unique identifier for referencing
  classes?: Array<string> // Optional: Styling or semantic classes
  // biome-ignore lint/suspicious/noExplicitAny: We don't know all K/V
  data?: Record<string, any> // Optional: Arbitrary metadata
  children?: Array<OxaNode> // Optional: Nested content nodes
};

type InlineOxaNode = Omit<OxaNode, 'type'> & {
  type: 'Text'
  value: string
}

type TextOxaNode = InlineOxaNode & {
  type: 'Text'
}

type HeadingOxaNode = Omit<OxaNode, 'children'> & {
  type: 'Heading'
  level: number
  children: Array<InlineOxaNode>
};

export const oxaToJsx = (content?: TextOxaNode | HeadingOxaNode | InlineOxaNode, options?: Options, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (content.type === 'Text') {
    return content.value;
  }
  if (content.type === 'Heading') {
    const level = content.level > 6 ? 6 : content.level < 1 ? 1 : content.level as 1 | 2 | 3 | 4 | 5 | 6;
    return <Heading id={content.id ?? ''} headingLevel={level} content={content.children.map((child) => oxaToJsx(child))}></Heading>
  }
  return '';
};
