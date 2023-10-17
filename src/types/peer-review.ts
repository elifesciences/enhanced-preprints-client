export enum ReviewType {
  EvaluationSummary = 'evaluation-summary',
  Review = 'review-article',
  AuthorResponse = 'reply',
}

type Participant = {
  name: string,
  role: string,
  institution: string,
};

type Evaluation = {
  date: Date,
  reviewType: ReviewType,
  text: string,
  participants: Participant[],
  doi?: string,
};

export type PeerReview = {
  evaluationSummary: Evaluation,
  reviews: Evaluation[],
  authorResponse?: Evaluation,
};
