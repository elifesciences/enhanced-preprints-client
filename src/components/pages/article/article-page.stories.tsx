import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePage, ReviewType } from './article-page';
import { mockContent } from '../../atoms/article-content/mock-content';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage {...args} />;

export const ArticlePageStory = Template.bind({});
ArticlePageStory.args = {
  content: mockContent,
  metaData: {
    doi: '10.1101/2022.04.13.488149',
    msid: '123456',
    version: '1',
    msas: ['Mad Science', 'Alchemy'],
    importance: 'Landmark',
    strengthOfEvidence: 'Tour-de-force',
    title: 'This is a title',
    authors: [
      { givenNames: ['Steve'], familyNames: ['Rogers'] },
      { givenNames: ['Antony'], familyNames: ['Stark'] },
      { givenNames: ['Natasha'], familyNames: ['Romanov'] },
      { givenNames: ['Bruce'], familyNames: ['Banner'] },
      { givenNames: ['Wanda'], familyNames: ['Maximof'] },
      { givenNames: ['Bucky'], familyNames: ['Barnes'] },
      { givenNames: ['Barry'], familyNames: ['Allen'] },
      { givenNames: ['Jesse'], familyNames: ['Quick'] },
      { givenNames: ['Kara'], familyNames: ['Zor-el'] },
      { givenNames: ['Arthur'], familyNames: ['Curry'] },
      { givenNames: ['Kal'], familyNames: ['El'] },
      { givenNames: ['Oliver'], familyNames: ['Queen'] },
    ],
    headings: [{ id: 's1', text: 'Introduction' }],
    views: 1,
    citations: 2,
    tweets: 3,
  },
  status: {
    articleType: 'Reviewed Preprint',
    status: 'This is a reviewed preprint',
    timeline: [
      { name: 'Peer review done', date: '2022-01-02' },
      { name: 'Preprint posted', date: '2022-01-01' },
    ],
  },
  peerReview: {
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
    reviews: [],
  },
};
