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

export const oxaToJsx = (content?: string, options?: Options, index?: number): JSXContent => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }
};
