import { Meta, StoryObj } from '@storybook/react';
import { ContentHeader } from './content-header';
import { authors } from '../../../utils/mocks';
import '../../../i18n';

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
  },
};
