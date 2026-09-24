import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeSection } from './claims-tree-section';

const meta: Meta<typeof ClaimsTreeSection> = {
  title: 'Molecules/Mira/ClaimsTreeSection',
  component: ClaimsTreeSection,
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
type Story = StoryObj<typeof ClaimsTreeSection>;

export const Default: Story = {
  args: {
    heading: 'Question:',
    summary: 'The paper investigates how responsibility for a partner\'s outcomes in risky choices evokes guilt and which brain regions are involved.',
    attribution: 'Quoted text in Abstract:',
    quote: 'The neural mechanisms underlying guilt evoked during such situations of social responsibility are still unknown.',
  },
};
