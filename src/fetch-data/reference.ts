import { z } from 'zod';
import { AuthorSchema } from './author';

interface PublicationShape {
  type: 'PublicationVolume' | 'Periodical' | 'CreativeWork' | 'PublicationIssue';
  name?: string;
  volumeNumber?: number | string;
  issueNumber?: number | string;
  isPartOf?: PublicationShape;
}
const PublicationSchema: z.ZodType<PublicationShape> = z.object({
  type: z.union([z.literal('PublicationVolume'), z.literal('Periodical'), z.literal('CreativeWork'), z.literal('PublicationIssue')]),
  name: z.string().optional(),
  volumeNumber: z.union([z.number(), z.string()]).optional(),
  issueNumber: z.union([z.number(), z.string()]).optional(),
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

export const ReferenceSchema = z.object({
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
  comments: z.array(z.object({
    type: z.literal('Comment'),
    commentAspect: z.string(),
  })).optional(),
  meta: z.object({
    yearPublished: z.string().optional(),
    label: z.string().optional(),
    publicationType: z.string().optional(),
  }).optional(),
});

export type Reference = z.infer<typeof ReferenceSchema>;
