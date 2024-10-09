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
    title: 'Significance of findings',
    terms: ['landmark', 'fundamental', 'important', 'valuable', 'useful'],
    selectedTerm: ['important'],
  },
};

export const StrengthList: Story = {
  args: {
    title: 'Strength of evidence',
    terms: ['exceptional', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate'],
    selectedTerm: ['compelling'],
  },
};

export const MultipleTermList: Story = {
  args: {
    title: 'Multiple terms',
    terms: ['landmark', 'fundamental', 'important', 'valuable', 'useful'],
    selectedTerm: ['important', 'fundamental'],
  },
};
