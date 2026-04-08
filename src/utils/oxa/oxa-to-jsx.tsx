import { type JSX } from 'react';

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
type NodeType = string | 'Text';

type OxaNode = {
  type: NodeType // Required: The node type identifier
  id?: string // Optional: Unique identifier for referencing
  classes?: Array<string> // Optional: Styling or semantic classes
  // biome-ignore lint/suspicious/noExplicitAny: We don't know all K/V
  data?: Record<string, any> // Optional: Arbitrary metadata
  children?: Array<OxaNode> // Optional: Nested content nodes
};


export const oxaToJsx = (content?: OxaNode, options?: Options, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  return '';
};
