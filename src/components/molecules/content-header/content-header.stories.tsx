import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ContentHeader } from './content-header';

export default {
  title: 'Molecules/ContentHeader',
  component: ContentHeader,
} as ComponentMeta<typeof ContentHeader>;

const Template: ComponentStory<typeof ContentHeader> = (args) => <ContentHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
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
};
