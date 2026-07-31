import { z } from 'zod';
import { AuthorSchema } from './author';
import { ReferenceSchema } from './reference';
import { ContentPartSchema } from '../content/content';

const ToDoSchema = z.any();

const ContentSchema = z.union([
  ContentPartSchema,
  ToDoSchema,
]);

const LicenseSchema = z.object({
  type: z.string(),
  url: z.string().optional(),
  content: ContentSchema.optional(),
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
