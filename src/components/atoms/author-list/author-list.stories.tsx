import { Meta, StoryObj } from '@storybook/react';
import { AuthorList } from './author-list';
import { authors } from '../../../utils/mocks';

const meta: Meta<typeof AuthorList> = {
  title: 'Atoms/AuthorList',
  component: AuthorList,
};

export default meta;
type Story = StoryObj<typeof AuthorList>;

export const AuthorListProps: Story = {
  args: {
    authors,
  },
};

AuthorListProps.storyName = 'Author List';
