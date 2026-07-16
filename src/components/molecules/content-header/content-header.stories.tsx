import { type Meta, type StoryObj } from '@storybook/nextjs';

import { ContentHeader } from './content-header';
import { authors } from '../../../utils/mocks';

const meta: Meta<typeof ContentHeader> = {
  title: 'Molecules/ContentHeader',
  component: ContentHeader,
};

export default meta;
type Story = StoryObj<typeof ContentHeader>;

export const Header: Story = {
  args: {
    msas: ['Mad Science', 'Alchemy'],
    title: 'This is a title',
    doi: 'bbc.co.uk',
    authors,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    institutions: [
      { name: 'Avengers', address: { addressCountry: 'New York' } },
      { name: 'X-Force', address: { addressCountry: 'Norwich' } },
      { name: 'Justice League', address: { addressCountry: 'Star City' } },
      { name: 'Justice League', address: { addressCountry: 'Arctic' } },
      { name: 'Justice League', address: { addressCountry: 'Central City' } },
      { name: 'Marvel Studios', address: { addressCountry: 'California' } },
    ],
  },
};
