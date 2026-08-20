import { z } from 'zod';

const ThematicBreakSchema = z.object({
  type: z.literal('ThematicBreak'),
});

type ThematicBreak = z.infer<typeof ThematicBreakSchema>;

// Recursive `content` field, shared by reference (not by `.extend()`/intersection)
// across every variant below. z.discriminatedUnion requires real ZodObject members,
// so each variant is built with z.object() directly rather than z.intersection —
// but merging DecoratedContentSchema's shape into each object via `.extend()` (or
// spreading `.shape`) forces TS to eagerly recompute the merged shape, which
// re-triggers the Content/ContentPart recursion cycle. Referencing this single
// pre-typed field avoids that.
const ContentField: z.ZodType<Content> = z.lazy(() => ContentSchema);

// Every variant whose own shape carries a `Content`-typed property (directly, not
// just via an array of an already-typed sibling schema) needs its exported type
// hand-written rather than derived with `z.infer`. Deriving via `z.infer` forces
// TypeScript to expand the schema's shape while `Content`/`ContentPart` are still
// being defined, which is exactly the cycle these annotations exist to avoid.
type DecoratedContent = { content: Content };

// Shared shape for the plain "type + content" variants, to avoid repeating the
// same ZodObject annotation ~10 times.
type DecoratedSchema<Tag extends string> = z.ZodObject<{ type: z.ZodLiteral<Tag>; content: z.ZodType<Content> }>;
function decorated<Tag extends string>(tag: Tag): DecoratedSchema<Tag> {
  return z.object({
    type: z.literal(tag),
    content: ContentField,
  });
}

type QuoteBlock = DecoratedContent & { type: 'QuoteBlock' };
const QuoteBlockSchema: DecoratedSchema<'QuoteBlock'> = decorated('QuoteBlock');

type Note = DecoratedContent & { type: 'Note' };
const NoteSchema: DecoratedSchema<'Note'> = decorated('Note');

type SubscriptContent = DecoratedContent & { type: 'Subscript' };
const SubscriptContentSchema: DecoratedSchema<'Subscript'> = decorated('Subscript');

type SuperscriptContent = DecoratedContent & { type: 'Superscript' };
const SuperscriptContentSchema: DecoratedSchema<'Superscript'> = decorated('Superscript');

type ParagraphContent = DecoratedContent & { type: 'Paragraph' };
const ParagraphContentSchema: DecoratedSchema<'Paragraph'> = decorated('Paragraph');

type StrongContent = DecoratedContent & { type: 'Strong' };
const StrongContentSchema: DecoratedSchema<'Strong'> = decorated('Strong');

type EmphasisContent = DecoratedContent & { type: 'Emphasis' };
const EmphasisContentSchema: DecoratedSchema<'Emphasis'> = decorated('Emphasis');

type NontextualAnnotationContent = DecoratedContent & { type: 'NontextualAnnotation' };
const NontextualAnnotationContentSchema: DecoratedSchema<'NontextualAnnotation'> = decorated('NontextualAnnotation');

type DateContent = DecoratedContent & { type: 'Date' };
const DateContentSchema: DecoratedSchema<'Date'> = decorated('Date');

type LinkContent = DecoratedContent & { type: 'Link'; target: string; relation?: string };
const LinkContentSchema: z.ZodObject<{
  type: z.ZodLiteral<'Link'>;
  content: z.ZodType<Content>;
  target: z.ZodString;
  relation: z.ZodOptional<z.ZodString>;
}> = z.object({
  type: z.literal('Link'),
  content: ContentField,
  target: z.string(),
  relation: z.string().optional(),
});

type CiteContent = DecoratedContent & { type: 'Cite'; target: string };
const CiteContentSchema: z.ZodObject<{
  type: z.ZodLiteral<'Cite'>;
  content: z.ZodType<Content>;
  target: z.ZodString;
}> = z.object({
  type: z.literal('Cite'),
  content: ContentField,
  target: z.string(),
});

const CiteGroupContentSchema = z.object({
  type: z.literal('CiteGroup'),
  items: z.array(CiteContentSchema),
});

type CiteGroupContent = z.infer<typeof CiteGroupContentSchema>;

type FigureContent = DecoratedContent & { type: 'Figure'; id?: string; caption?: Content; label?: string };
const FigureContentSchema: z.ZodObject<{
  type: z.ZodLiteral<'Figure'>;
  content: z.ZodType<Content>;
  id: z.ZodOptional<z.ZodString>;
  caption: z.ZodOptional<z.ZodType<Content>>;
  label: z.ZodOptional<z.ZodString>;
}> = z.object({
  type: z.literal('Figure'),
  content: ContentField,
  id: z.string().optional(),
  caption: ContentField.optional(),
  label: z.string().optional(),
});

export type ImageObjectContent = {
  type: 'ImageObject';
  id?: string;
  contentUrl?: string;
  content?: Content;
  meta: {
    inline: boolean;
  };
};

const ImageObjectContentSchema: z.ZodObject<{
  type: z.ZodLiteral<'ImageObject'>;
  id: z.ZodOptional<z.ZodString>;
  contentUrl: z.ZodOptional<z.ZodString>;
  content: z.ZodOptional<z.ZodType<Content>>;
  meta: z.ZodObject<{ inline: z.ZodBoolean }>;
}> = z.object({
  type: z.literal('ImageObject'),
  id: z.string().optional(),
  contentUrl: z.string().optional(),
  content: ContentField.optional(),
  meta: z.object({
    inline: z.boolean(),
  }),
});

type ListItemContent = DecoratedContent & { type: 'ListItem' };
const ListItemContentSchema: DecoratedSchema<'ListItem'> = decorated('ListItem');

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

type ClaimContent = DecoratedContent & {
  type: 'Claim';
  claimType?: 'Statement' | 'Theorem' | 'Lemma' | 'Proof' | 'Postulate' | 'Hypothesis' | 'Proposition' | 'Corollary';
  label?: Content;
  title?: Content;
};
const ClaimContentSchema: z.ZodObject<{
  type: z.ZodLiteral<'Claim'>;
  content: z.ZodType<Content>;
  claimType: z.ZodOptional<z.ZodUnion<readonly [
    z.ZodLiteral<'Statement'>,
    z.ZodLiteral<'Theorem'>,
    z.ZodLiteral<'Lemma'>,
    z.ZodLiteral<'Proof'>,
    z.ZodLiteral<'Postulate'>,
    z.ZodLiteral<'Hypothesis'>,
    z.ZodLiteral<'Proposition'>,
    z.ZodLiteral<'Corollary'>,
  ]>>;
  label: z.ZodOptional<z.ZodType<Content>>;
  title: z.ZodOptional<z.ZodType<Content>>;
}> = z.object({
  type: z.literal('Claim'),
  content: ContentField,
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
  label: ContentField.optional(),
  title: ContentField.optional(),
});

type HeadingContent = DecoratedContent & { type: 'Heading'; id?: string; depth: 1 | 2 | 3 | 4 | 5 | 6 };
const HeadingContentSchema: z.ZodObject<{
  type: z.ZodLiteral<'Heading'>;
  content: z.ZodType<Content>;
  id: z.ZodOptional<z.ZodString>;
  depth: z.ZodUnion<readonly [
    z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>,
    z.ZodLiteral<4>, z.ZodLiteral<5>, z.ZodLiteral<6>,
  ]>;
}> = z.object({
  type: z.literal('Heading'),
  content: ContentField,
  id: z.string().optional(),
  depth: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
});

export type { HeadingContent };

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

// The single ~O(1) discriminant-lookup replacing the old z.union of ~19 members.
// `string` and the recursive array branch aren't objects, so they stay outside it,
// same shape as the top-level union below.
const ContentPartObjectSchema = z.discriminatedUnion('type', [
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
  z.string(),
  ContentPartObjectSchema,
  z.array(z.lazy(() => ContentSchema)),
]);
