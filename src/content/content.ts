import { z } from 'zod';

type DecoratedContent = {
  content: Content,
};

type ParagraphContent = DecoratedContent & {
  type: 'Paragraph',
};

type StrongContent = DecoratedContent & {
  type: 'Strong',
};

type NontextualAnnotationContent = DecoratedContent & {
  type: 'NontextualAnnotation',
};

type DateContent = DecoratedContent & {
  type: 'Date',
};

type LinkContent = DecoratedContent & {
  type: 'Link',
  target: string,
  relation?: string,
};

type CiteContent = DecoratedContent & {
  type: 'Cite',
  target: string,
};

type CiteGroupContent = {
  type: 'CiteGroup',
  items: CiteContent[],
};

type FigureContent = DecoratedContent & {
  type: 'Figure',
  id?: string,
  caption?: Content,
  label?: string,
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

type ListItemContent = DecoratedContent & {
  type: 'ListItem',
};

type ClaimContent = DecoratedContent & {
  type: 'Claim',
  claimType?: 'Statement' | 'Theorem' | 'Lemma' | 'Proof' | 'Postulate' | 'Hypothesis' | 'Proposition' | 'Corollary',
  label?: Content,
  title?: Content,
};

type ThematicBreak = {
  type: 'ThematicBreak',
};

export const listType = ['order', 'bullet', 'alpha-lower', 'alpha-upper', 'roman-lower', 'roman-upper', 'simple', 'custom'] as const;
export type ListContent = {
  type: 'List',
  order: 'Unordered' | 'Ascending',
  items: Array<ListItemContent>,
  meta?: {
    listType: typeof listType[number],
  }
};

export type HeadingContent = DecoratedContent & {
  type: 'Heading',
  id: string,
  depth: 1 | 2 | 3 | 4 | 5 | 6,
};

export type ImageObjectContent = {
  type: 'ImageObject',
  id?: string,
  contentUrl?: string,
  content?: Content
  meta: {
    inline: boolean,
  },
};

type ContentPart =
  string |
  HeadingContent |
  EmphasisContent |
  SuperscriptContent |
  SubscriptContent |
  ParagraphContent |
  StrongContent |
  NontextualAnnotationContent |
  DateContent |
  LinkContent |
  CiteContent |
  CiteGroupContent |
  FigureContent |
  ImageObjectContent |
  ListItemContent |
  ListContent |
  ClaimContent |
  ThematicBreak;

export type Content = ContentPart | Array<Content>;

const ThematicBreakSchema = z.any();

const DecoratedContentSchema = z.object({
  content: z.lazy(() => ContentSchema),
});

const SubscriptContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Subscript'),
}));

const SuperscriptContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Superscript'),
}));

const ParagraphContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Paragraph'),
}));

const StrongContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Strong'),
}));

const EmphasisContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Emphasis'),
}));

const NontextualAnnotationContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('NontextualAnnotation'),
}));

const DateContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Date'),
}));

const LinkContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Link'),
  target: z.string(),
  relation: z.string().optional(),
}));

const CiteContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Cite'),
  target: z.string(),
}));

const CiteGroupContentSchema = z.object({
  type: z.literal('CiteGroup'),
  items: z.array(CiteContentSchema),
});

const FigureContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Figure'),
  id: z.string().optional(),
  caption: z.lazy(() => ContentSchema).optional(),
  label: z.string().optional(),
}));

const ImageObjectContentSchema = z.object({
  type: z.literal('ImageObject'),
  id: z.string().optional(),
  contentUrl: z.string().optional(),
  content: z.lazy(() => ContentSchema).optional(),
  meta: z.object({
    inline: z.boolean(),
  }),
});

const ListItemContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('ListItem'),
}));

const ListContentSchema = z.object({
  type: z.literal('List'),
  order: z.union([z.literal('Unordered'), z.literal('Ascending')]),
  items: z.array(ListItemContentSchema),
  meta: z.object({
    listType: z.union([
      z.literal('order'),
      z.literal('bullet'),
      z.literal('alpha-lower'),
      z.literal('alpha-upper'),
      z.literal('roman-lower'),
      z.literal('roman-upper'),
      z.literal('simple'),
      z.literal('custom'),
    ]),
  }).optional(),
});

const ClaimContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Claim'),
  claimType: z.union([
    z.literal('Statement'),
    z.literal('Theorem'),
    z.literal('Lemma'),
    z.literal('Proof'),
    z.literal('Postulate'),
    z.literal('Hypothesis'),
    z.literal('Proposition'),
    z.literal('Corollary'),
  ]).optional(),
  label: z.lazy(() => ContentSchema).optional(),
  title: z.lazy(() => ContentSchema).optional(),
}));

const HeadingContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Heading'),
  id: z.string(),
  depth: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
}));

const ContentPartSchema = z.union([
  z.string(),
  HeadingContentSchema,
  EmphasisContentSchema,
  SuperscriptContentSchema,
  SubscriptContentSchema,
  ParagraphContentSchema,
  StrongContentSchema,
  NontextualAnnotationContentSchema,
  DateContentSchema,
  LinkContentSchema,
  CiteContentSchema,
  CiteGroupContentSchema,
  FigureContentSchema,
  ImageObjectContentSchema,
  ListItemContentSchema,
  ListContentSchema,
  ClaimContentSchema,
  ThematicBreakSchema,
]);

export const ContentSchema: z.ZodType<Content> = z.union([
  ContentPartSchema,
  z.array(z.lazy(() => ContentSchema)),
]);
