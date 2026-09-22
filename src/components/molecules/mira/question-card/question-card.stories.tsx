import { type Meta, type StoryObj } from '@storybook/nextjs';
import { QuestionCard } from './question-card';

const meta: Meta<typeof QuestionCard> = {
  title: 'Molecules/Mira/QuestionCard',
  component: QuestionCard,
  parameters: {
    chromatic: {
      modes: {
        small: {
          viewport: 'small',
        },
        medium: {
          viewport: 'medium',
        },
        large: {
          viewport: 'large',
        },
        extraLarge: {
          viewport: 'extraLarge',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

export const SingleClaim: Story = {
  args: {
    questionNumber: '2',
    text: 'Is the treatment safe for long-term use?',
    claimCount: '1',
  },
};

export const ManyClaims: Story = {
  args: {
    questionNumber: '3',
    text: 'What are the mechanisms underlying the observed therapeutic effects?',
    claimCount: '12',
  },
};

export const LongQuestion: Story = {
  args: {
    questionNumber: '4',
    text: 'How do the pharmacokinetic properties of the compound vary across different patient populations, and what implications does this have for dosing strategies in clinical practice?',
    claimCount: '5',
  },
};
