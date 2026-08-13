import { z } from 'zod';

type DecoratedContent = {
  content: Content,
};

export type ListType = ['order', 'bullet', 'alpha-lower', 'alpha-upper', 'roman-lower', 'roman-upper', 'simple', 'custom'];

const ThematicBreakSchema = z.object({
  type: z.literal('ThematicBreak'),
});

type ThematicBreak = z.infer<typeof ThematicBreakSchema>;

const DecoratedContentSchema = z.object({
  content: z.lazy(() => ContentSchema),
});

const QuoteBlockSchema: z.ZodType<DecoratedContent & { type: 'QuoteBlock' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('QuoteBlock'),
}));

type QuoteBlock = z.infer<typeof QuoteBlockSchema>;

const NoteSchema: z.ZodType<DecoratedContent & { type: 'Note' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Note'),
}));

type Note = z.infer<typeof NoteSchema>;

const SubscriptContentSchema: z.ZodType<DecoratedContent & { type: 'Subscript' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Subscript'),
}));

type SubscriptContent = z.infer<typeof SubscriptContentSchema>;

const SuperscriptContentSchema: z.ZodType<DecoratedContent & { type: 'Superscript' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Superscript'),
}));

type SuperscriptContent = z.infer<typeof SuperscriptContentSchema>;

const ParagraphContentSchema: z.ZodType<DecoratedContent & { type: 'Paragraph' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Paragraph'),
}));

type ParagraphContent = z.infer<typeof ParagraphContentSchema>;

const StrongContentSchema: z.ZodType<DecoratedContent & { type: 'Strong' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Strong'),
}));

type StrongContent = z.infer<typeof StrongContentSchema>;

const EmphasisContentSchema: z.ZodType<DecoratedContent & { type: 'Emphasis' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Emphasis'),
}));

type EmphasisContent = z.infer<typeof EmphasisContentSchema>;

const NontextualAnnotationContentSchema: z.ZodType<DecoratedContent & { type: 'NontextualAnnotation' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('NontextualAnnotation'),
}));

type NontextualAnnotationContent = z.infer<typeof NontextualAnnotationContentSchema>;

const DateContentSchema: z.ZodType<DecoratedContent & { type: 'Date' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Date'),
}));

type DateContent = z.infer<typeof DateContentSchema>;

const LinkContentSchema: z.ZodType<DecoratedContent & { type: 'Link'; target: string; relation?: string }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Link'),
  target: z.string(),
  relation: z.string().optional(),
}));

type LinkContent = z.infer<typeof LinkContentSchema>;

const CiteContentSchema: z.ZodType<DecoratedContent & { type: 'Cite'; target: string }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Cite'),
  target: z.string(),
}));

type CiteContent = z.infer<typeof CiteContentSchema>;

const CiteGroupContentSchema = z.object({
  type: z.literal('CiteGroup'),
  items: z.array(CiteContentSchema),
});

type CiteGroupContent = z.infer<typeof CiteGroupContentSchema>;

const FigureContentSchema: z.ZodType<DecoratedContent & { type: 'Figure'; id?: string; caption?: Content; label?: string }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Figure'),
  id: z.string().optional(),
  caption: z.lazy(() => ContentSchema).optional(),
  label: z.string().optional(),
}));

type FigureContent = z.infer<typeof FigureContentSchema>;

const ImageObjectContentSchema: z.ZodType<{
  type: 'ImageObject',
  id?: string,
  contentUrl?: string,
  content?: Content,
  meta: {
    inline: boolean,
  },
}> = z.object({
  type: z.literal('ImageObject'),
  id: z.string().optional(),
  contentUrl: z.string().optional(),
  content: z.lazy(() => ContentSchema).optional(),
  meta: z.object({
    inline: z.boolean(),
  }),
});

export type ImageObjectContent = z.infer<typeof ImageObjectContentSchema>;

const ListItemContentSchema: z.ZodType<DecoratedContent & { type: 'ListItem' }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('ListItem'),
}));

type ListItemContent = z.infer<typeof ListItemContentSchema>;

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

export type ListContent = z.infer<typeof ListContentSchema>;

const ClaimContentSchema: z.ZodType<DecoratedContent & {
  type: 'Claim';
  claimType?: 'Statement' | 'Theorem' | 'Lemma' | 'Proof' | 'Postulate' | 'Hypothesis' | 'Proposition' | 'Corollary';
  label?: Content;
  title?: Content;
}> = z.intersection(DecoratedContentSchema, z.object({
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

type ClaimContent = z.infer<typeof ClaimContentSchema>;

const HeadingContentSchema: z.ZodType<DecoratedContent & { type: 'Heading'; id?: string; depth: 1 | 2 | 3 | 4 | 5 | 6 }> = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Heading'),
  id: z.string().optional(),
  depth: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
}));

export type HeadingContent = z.infer<typeof HeadingContentSchema>;

type ContentPart =
  string |
  QuoteBlock |
  Note |
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

const ContentPartSchema = z.union([
  z.string(),
  QuoteBlockSchema,
  NoteSchema,
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
