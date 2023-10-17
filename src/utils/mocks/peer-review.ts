import { PeerReview, ReviewType } from '../../types/peer-review';

export const peerReview: PeerReview = {
  evaluationSummary: {
    date: new Date('2022-01-02'),
    participants: [
      {
        institution: 'Somewhere',
        name: 'Professor Charles Xavier',
        role: 'senior-editor',
      },
    ],
    reviewType: ReviewType.EvaluationSummary,
    text: 'This paper is important and is very convincing',
    doi: '10.7554/eLife.81090.sa0',
  },
  reviews: [
    {
      date: new Date('2022-01-02'),
      participants: [
        {
          institution: 'Stark Industries',
          name: 'Anthony Stark',
          role: 'peer-reviewer',
        },
      ],
      reviewType: ReviewType.EvaluationSummary,
      text: 'Well done, Stephen.',
      doi: '10.7554/eLife.81090.sa1',
    },
    {
      date: new Date('2022-01-03'),
      participants: [
        {
          institution: 'S.H.I.E.L.D',
          name: 'Gemma Simmons',
          role: 'peer-reviewer',
        },
      ],
      reviewType: ReviewType.EvaluationSummary,
      text: 'Strange as the author, I am a scientist not a wizard.',
      doi: '10.7554/eLife.81090.sa2',
    },
  ],
  authorResponse: {
    date: new Date('2022-01-02'),
    participants: [
      {
        institution: 'Somewhere',
        name: 'Dr Stephen Strange',
        role: 'author',
      },
    ],
    reviewType: ReviewType.EvaluationSummary,
    text: 'I thank you for the review and take it as irrefutable proof and that I more intelligent that Tony.',
    doi: '10.7554/eLife.81090.sa3',
  },
};
