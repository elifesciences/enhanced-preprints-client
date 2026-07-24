import { type IsoDateString } from "./enhanced-article";

type Participant = {
  name: string,
  role: string,
  institution?: string,
};

type Evaluation = {
  date: IsoDateString,
  doi?: string,
  reviewType: 'evaluation-summary' | 'review-article' | 'reply',
  text: string,
  participants: Participant[],
};

export type PeerReview = {
  evaluationSummary?: Evaluation,
  reviews: Evaluation[],
  authorResponse?: Evaluation,
};
