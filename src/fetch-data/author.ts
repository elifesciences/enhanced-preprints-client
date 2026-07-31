import { z } from 'zod';

const InstitutionSchema = z.object({
  name: z.string(),
  address: z.object({
    addressCountry: z.string(),
  }).optional(),
});

export type Institution = z.infer<typeof InstitutionSchema>;

export const AuthorSchema = z.object({
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

export type Author = z.infer<typeof AuthorSchema>;
