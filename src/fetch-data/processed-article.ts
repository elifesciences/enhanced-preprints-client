import { z } from 'zod';

const ToDoSchema = z.any();

const ContentSchema = ToDoSchema;

const InstitutionSchema = z.object({
  name: z.string(),
  address: z.object({
    addressCountry: z.string(),
  }).optional(),
});

const AuthorSchema = z.object({
  type: z.union([z.literal('Person'), z.literal('Organization')]).optional(),
  name: z.string().optional(),
  givenNames: z.array(z.string()).optional(),
  honorificSuffix: z.string().optional(),
  familyNames: z.array(z.string()).optional(),
  affiliations: z.array(InstitutionSchema).optional(),
  identifiers: z.array(z.object({
    type: z.string().optional(),
    name: z.string().optional(),
    propertyID: z.string().optional(),
    value: z.string(),
  })).optional(),
  emails: z.array(z.string()).optional(),
  meta: z.object({
    notes: z.array(z.object({
      type: z.string(),
      rid: z.string(),
      label: z.string().optional(),
    })).optional(),
    personGroupType: z.string().optional(),
  }).optional(),
});

const LicenseSchema = z.object({
  type: z.string(),
  url: z.string().optional(),
  content: ContentSchema.optional(),
});

interface PublicationShape {
  type: 'PublicationVolume' | 'Periodical' | 'CreativeWork' | 'PublicationIssue';
  name?: string;
  volumeNumber?: number | string;
  issueNumber?: number;
  isPartOf?: PublicationShape;
}
const PublicationSchema: z.ZodType<PublicationShape> = z.object({
  type: z.union([z.literal('PublicationVolume'), z.literal('Periodical'), z.literal('CreativeWork'), z.literal('PublicationIssue')]),
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
