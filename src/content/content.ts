import { z } from 'zod';

const ThematicBreakSchema = z.object({
  type: z.literal('ThematicBreak'),
});

type ThematicBreak = z.infer<typeof ThematicBreakSchema>;

const DecoratedContentSchema: z.ZodType<{ content: Content }> = z.object({
  content: z.lazy(() => ContentSchema),
});

const OptionalContentSchema: z.ZodType<{ content?: Content }> = z.object({
  content: z.lazy(() => ContentSchema).optional(),
});

const QuoteBlockSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('QuoteBlock'),
}));

type QuoteBlock = z.infer<typeof QuoteBlockSchema>;

const NoteSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Note'),
}));

type Note = z.infer<typeof NoteSchema>;

const SubscriptContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Subscript'),
}));

type SubscriptContent = z.infer<typeof SubscriptContentSchema>;

const SuperscriptContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Superscript'),
}));

type SuperscriptContent = z.infer<typeof SuperscriptContentSchema>;

const ParagraphContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Paragraph'),
}));

type ParagraphContent = z.infer<typeof ParagraphContentSchema>;

const StrongContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Strong'),
}));

type StrongContent = z.infer<typeof StrongContentSchema>;

const EmphasisContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Emphasis'),
}));

type EmphasisContent = z.infer<typeof EmphasisContentSchema>;

const NontextualAnnotationContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('NontextualAnnotation'),
}));

type NontextualAnnotationContent = z.infer<typeof NontextualAnnotationContentSchema>;

const DateContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Date'),
}));

type DateContent = z.infer<typeof DateContentSchema>;

const LinkContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Link'),
  target: z.string(),
  relation: z.string().optional(),
}));

type LinkContent = z.infer<typeof LinkContentSchema>;

const CiteContentSchema = z.intersection(DecoratedContentSchema, z.object({
  type: z.literal('Cite'),
  target: z.string(),
}));

type CiteContent = z.infer<typeof CiteContentSchema>;

const CiteGroupContentSchema = z.object({
  type: z.literal('CiteGroup'),
  items: z.array(CiteContentSchema),
});

type CiteGroupContent = z.infer<typeof CiteGroupContentSchema>;

const FigureContentCaptionSchema: z.ZodType<{
  caption?: Content;
}> = z.object({
  caption: z.lazy(() => ContentSchema).optional(),
});

const FigureContentSchema = z.intersection(
  z.intersection(DecoratedContentSchema, z.object({
    type: z.literal('Figure'),
    id: z.string().optional(),
    label: z.string().optional(),
  })),
  FigureContentCaptionSchema,
);

type FigureContent = z.infer<typeof FigureContentSchema>;

const ImageObjectContentSchema = z.intersection(OptionalContentSchema, z.object({
  type: z.literal('ImageObject'),
  id: z.string().optional(),
  contentUrl: z.string().optional(),
  meta: z.object({
    inline: z.boolean(),
  }),
}));

export type ImageObjectContent = z.infer<typeof ImageObjectContentSchema>;

const ListItemContentSchema = z.intersection(DecoratedContentSchema, z.object({
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

const ClaimContentLabelAndTitleSchema: z.ZodType<{
  label?: Content;
  title?: Content;
}> = z.object({
  label: z.lazy(() => ContentSchema).optional(),
  title: z.lazy(() => ContentSchema).optional(),
});

const ClaimContentSchema = z.intersection(
  z.intersection(DecoratedContentSchema, z.object({
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
  })),
  ClaimContentLabelAndTitleSchema,
);

type ClaimContent = z.infer<typeof ClaimContentSchema>;

const HeadingContentSchema = z.intersection(DecoratedContentSchema, z.object({
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
