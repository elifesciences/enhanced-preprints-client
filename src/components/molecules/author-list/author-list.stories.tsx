import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthorList } from './author-list';

export default {
  title: 'Molecules/AuthorList',
  component: AuthorList,
} as ComponentMeta<typeof AuthorList>;

const Template: ComponentStory<typeof AuthorList> = (args) => (
  <AuthorList {...args} />
);

export const Authors = Template.bind({});
Authors.args = {
  authors: [
    { givenNames: ['Steve'], familyNames: ['Rogers'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
    { givenNames: ['Antony'], familyNames: ['Stark'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
    { givenNames: ['Natasha'], familyNames: ['Romanov'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
    { givenNames: ['Bruce'], familyNames: ['Banner'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
    { givenNames: ['Wanda'], familyNames: ['Maximof'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
    { givenNames: ['Bucky'], familyNames: ['Barnes'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
    { givenNames: ['Barry'], familyNames: ['Allen'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }] },
    { givenNames: ['Jesse'], familyNames: ['Quick'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }] },
    { givenNames: ['Kara'], familyNames: ['Zor-el'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }] },
    { givenNames: ['Kal'], familyNames: ['El'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }] },
    { givenNames: ['Arthur'], familyNames: ['Curry'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }] },
    { givenNames: ['Oliver'], familyNames: ['Queen'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Central City' } }] },
  ],
};
