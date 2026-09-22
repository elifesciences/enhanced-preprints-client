import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimCard } from './claim-card';

const meta: Meta<typeof ClaimCard> = {
  title: 'Molecules/Mira/ClaimCard',
  component: ClaimCard,
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
type Story = StoryObj<typeof ClaimCard>;

export const SingleRelated: Story = {
  args: {
    questionNumber: '2',
    claimNumber: '3',
    title: 'Treatment with the compound resulted in a 50% reduction in inflammatory markers',
    related: ['Figure 3'],
  },
};

export const TwoRelated: Story = {
  args: {
    questionNumber: '1',
    claimNumber: '1',
    title: 'The novel compound XYZ-123 inhibits tumor growth in mouse models',
    related: ['Figure 1', 'Table 2'],
  },
};

export const MultipleRelated: Story = {
  args: {
    questionNumber: '1',
    claimNumber: '2',
    title: 'The protein expression levels were significantly elevated in the experimental group compared to controls',
    related: ['Figure 2', 'Figure 4', 'Table 1', 'Supplementary Data 1'],
  },
};

export const LongTitle: Story = {
  args: {
    questionNumber: '3',
    claimNumber: '5',
    title: 'Analysis of the multi-omics data revealed a complex interplay between genetic variants, epigenetic modifications, and environmental factors that collectively contribute to the observed phenotypic variation across different population subgroups',
    related: ['Figure 5', 'Table 3', 'Supplementary Figure 1'],
  },
};
