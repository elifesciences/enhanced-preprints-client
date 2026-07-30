import { z } from 'zod';

const ToDoSchema = z.any();

const ContentSchema = ToDoSchema;
const AuthorSchema = ToDoSchema;
const LicenseSchema = z.object({
  type: z.string(),
  url: z.string().optional(),
  content: ContentSchema.optional(),
});

interface PublicationShape {
  type: 'PublicationVolume' | 'Periodical';
  name?: string;
  volumeNumber?: number | string;
  issueNumber?: number;
  isPartOf?: PublicationShape;
}
const PublicationSchema: z.ZodType<PublicationShape> = z.object({
  type: z.union([z.literal('PublicationVolume'), z.literal('Periodical')]),
  name: z.string().optional(),
  volumeNumber: z.union([z.number(), z.string()]).optional(),
  issueNumber: z.number().optional(),
  isPartOf: z.lazy(() => PublicationSchema).optional(),
});

const PublisherSchema = z.object({
  type: z.literal('Organization'),
  name: z.string(),
  address: z.object({
    type: z.literal('PostalAddress'),
    addressLocality: z.string(),
  }).optional(),
});

const CommentSchema = z.object({
  type: z.literal('Comment'),
  commentAspect: z.string(),
});

const ReferenceSchema = z.object({
  type: z.literal('Article'),
  id: z.string(),
  title: z.string(),
  url: z.string().optional(),
  pageEnd: z.union([z.number(), z.string()]).optional(),
  pageStart: z.union([z.number(), z.string()]).optional(),
  authors: z.array(AuthorSchema),
  datePublished: z.union([z.string(), z.object({
    type: z.literal('Date'),
    value: z.string(),
  })]).optional(),
  isPartOf: PublicationSchema.optional(),
  publisher: PublisherSchema.optional(),
  identifiers: z.array(z.object({
    type: z.string(),
    name: z.string(),
    propertyID: z.string().optional(),
    value: z.string(),
  })).optional(),
  comments: z.array(CommentSchema).optional(),
  meta: z.object({
    yearPublished: z.string().optional(),
    label: z.string().optional(),
    publicationType: z.string().optional(),
  }).optional(),
});

export const ProcessedArticleSchema = z.object({
  title: ContentSchema,
  authors: z.array(AuthorSchema).optional(),
  abstract: ContentSchema,
  licenses: z.array(LicenseSchema),
  content: ContentSchema,
  references: z.array(ReferenceSchema),
  meta: z.object({
    authorNotes: z.array(z.object({
      type: z.string(),
      id: z.string().optional(),
      text: z.string(),
      label: z.string().optional(),
    })).optional(),
  }).optional(),
});
