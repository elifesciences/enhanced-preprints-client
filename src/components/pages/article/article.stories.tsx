import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mockContent } from '../../atoms/article-content/mock-content';
import { ArticlePage } from './article';

export default {
  title: 'Pages/Article',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage {...args} />;

export const DefaultArticlePage = Template.bind({});
DefaultArticlePage.args = {
  msas: ['Mad Science', 'Alchemy'],
  importance: 'Landmark',
  strengthOfEvidence: 'Tour-de-force',
  title: 'This is a title',
  doi: 'bbc.co.uk',
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
  content: mockContent,
};
