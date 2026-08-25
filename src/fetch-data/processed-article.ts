import { z } from 'zod';
import {type Author, AuthorSchema} from './author';
import {type Reference, ReferenceSchema} from './reference';
import {type Content, ContentSchema} from '../content';

const LicenseSchema = z.object({
  type: z.string(),
  url: z.string().optional(),
  content: ContentSchema.optional(),
});

type License = {
  type: string,
  url?: string,
  content?: Content,
};

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

export type ProcessedArticle = {
  title: Content,
  authors?: Author[],
  abstract: Content,
  licenses: License[],
  content: Content,
  references: Reference[],
  meta?: {
    authorNotes?: {
      type: string,
      id?: string,
      text: string,
      label?: string,
    }[],
  },
};
