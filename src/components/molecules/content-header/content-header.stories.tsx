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
  institutions: [
    { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
    { name: 'Star Labs', address: { addressCountry: 'Star City' } },
    { name: 'Avengers Tower', address: { addressCountry: 'New York' } },
    { name: 'Bat Cave', address: { addressCountry: 'Gotham' } },
    { name: 'Arrow Cave', address: { addressCountry: 'Central City' } },
  ]
};
