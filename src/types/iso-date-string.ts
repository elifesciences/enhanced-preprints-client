import * as z from 'zod/v4';

export const IsoDateStringSchema = z.iso.datetime().brand<'IsoDateString'>();

export type IsoDateString = z.infer<typeof IsoDateStringSchema>;
