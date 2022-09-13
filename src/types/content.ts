type DecoratedContent = {
  content: Content,
};

type ParagraphContent = DecoratedContent & {
  type: 'Paragraph',
};

type StrongContent = DecoratedContent & {
  type: 'Strong',
};

type DateContent = DecoratedContent & {
  type: 'Date',
};

type LinkContent = DecoratedContent & {
  type: 'Link',
  target: string,
};

type CiteContent = DecoratedContent & {
  type: 'Cite',
  target: string,
};

type HeadingContent = DecoratedContent & {
  type: 'Heading',
  id: string,
  depth: 1 | 2 | 3 | 4 | 5 | 6,
};

type FigureContent = DecoratedContent & {
  type: 'Figure',
  id: string,
  caption: Content,
  label: string,
};

type ImageObjectContent = DecoratedContent & {
  type: 'ImageObject',
  contentUrl: string,
  meta: {
    inline: boolean,
  },
};

type EmphasisContent = DecoratedContent & {
  type: 'Emphasis',
};

type SuperscriptContent = DecoratedContent & {
  type: 'Superscript',
};

type SubscriptContent = DecoratedContent & {
  type: 'Subscript',
};

type ContentPart =
  string |
  HeadingContent |
  EmphasisContent |
  SuperscriptContent |
  SubscriptContent |
  ParagraphContent |
  StrongContent |
  DateContent |
  LinkContent |
  CiteContent |
  FigureContent |
  ImageObjectContent;

export type Content = ContentPart | Array<ContentPart>;
