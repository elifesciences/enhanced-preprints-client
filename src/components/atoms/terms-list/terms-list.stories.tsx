import { Meta, StoryObj } from '@storybook/react';
import { TermsList } from './terms-list';

const meta: Meta<typeof TermsList> = {
  title: 'Atoms/Terms List',
  component: TermsList,
};

export default meta;
type Story = StoryObj<typeof TermsList>;

export const SignificanceList: Story = {
  args: {
    terms: ['landmark', 'fundamental', 'important', 'valuable', 'useful'],
    selectedTerm: ['important'],
  },
};

export const MultipleSignificanceList: Story = {
  args: {
    terms: ['landmark', 'fundamental', 'important', 'valuable', 'useful'],
    selectedTerm: ['important', 'fundamental'],
  },
};

export const StrengthList: Story = {
  args: {
    terms: ['exceptional', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate'],
    selectedTerm: ['compelling'],
  },
};
