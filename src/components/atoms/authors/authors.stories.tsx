import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Authors } from './authors';

export default {
  title: 'Atoms/Authors',
  component: Authors,
} as ComponentMeta<typeof Authors>;

const Template: ComponentStory<typeof Authors> = (args) => <Authors {...args} />;

export const AuthorList = Template.bind({});
AuthorList.args = {
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
