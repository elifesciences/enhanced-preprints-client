import { type Meta, type StoryObj } from '@storybook/react';
import { AuthorNotes } from './author-notes';
import { authorNotes } from '../../../utils/mocks';

const meta: Meta<typeof AuthorNotes> = {
  title: 'Atoms/AuthorNotes',
  component: AuthorNotes,
};

export default meta;
type Story = StoryObj<typeof AuthorNotes>;

export const AuthorNotesSimple: Story = {
  args: {
    authorNotes,
  },
};
