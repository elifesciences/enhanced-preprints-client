import { ComponentStory, ComponentMeta } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { ArticlePage } from './article';
import { mockContent } from '../../atoms/article-content/mock-content';

export default {
  title: 'Pages/Article',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = () => {
  fetchMock.restore().mock('http://localhost:3000/metadata/12345', {
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
  })
    .mock('http://localhost:3000/content/12345', mockContent);

  return <ArticlePage doi="12345"/>;
};

export const DefaultArticlePage = Template.bind({});
