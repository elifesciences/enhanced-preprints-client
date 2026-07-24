import * as z from 'zod/v4';
import {
    IsoDateStringSchema,
} from '../../types';

const ParticipantSchema = z.object({
    name: z.string(),
    role: z.string(),
    institution: z.string().optional(),
});

const EvaluationSchema = z.object({
    date: IsoDateStringSchema,
    doi: z.string().optional(),
    reviewType: z.union([z.literal('evaluation-summary'), z.literal('review-article'), z.literal('reply'), z.literal('author-response')]),
    text: z.string(),
    participants: z.array(ParticipantSchema),
});

export const PeerReviewSchema = z.object({
    evaluationSummary: EvaluationSchema.optional(),
    reviews: z.array(EvaluationSchema),
    authorResponse: EvaluationSchema.optional(),
});

export type PeerReview = z.infer<typeof PeerReviewSchema>;
