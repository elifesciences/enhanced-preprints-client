import { StoryFn, Meta } from '@storybook/react';

import { Institutions } from './institutions';

export default {
  title: 'Atoms/Institutions',
  component: Institutions,
} as Meta<typeof Institutions>;

const Template: StoryFn<typeof Institutions> = (args) => <Institutions {...args} />;

export const InstitutionList = Template.bind({});
InstitutionList.args = {
  institutions: [
    { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
    { name: 'Star Labs', address: { addressCountry: 'Star City' } },
    { name: 'Avengers Tower', address: { addressCountry: 'New York' } },
    { name: 'Bat Cave', address: { addressCountry: 'Gotham' } },
    { name: 'Arrow Cave', address: { addressCountry: 'Central City' } },
  ],
};
