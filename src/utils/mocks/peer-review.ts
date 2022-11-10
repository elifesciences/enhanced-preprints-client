import { ReviewType } from '../../types/peer-review';

export const peerReview = {
  evaluationSummary: {
    date: new Date('2022-01-02'),
    participants: [
      {
        institution: 'Somewhere',
        name: 'Dr Stephen Strange',
        role: 'editor',
      },
    ],
    reviewType: ReviewType.EvaluationSummary,
    text: 'This paper is important and is very convincing',
  },
  reviews: [
    {
      date: new Date('2022-01-02'),
      participants: [
        {
          institution: 'Somewhere',
          name: 'Dr Stephen Strange',
          role: 'editor',
        },
      ],
      reviewType: ReviewType.EvaluationSummary,
      text: 'This paper is important and is very convincing',
    },
  ],
};
