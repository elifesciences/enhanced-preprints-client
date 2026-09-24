import { type Meta, type StoryObj } from '@storybook/nextjs';
import { RelatedStudy } from './related-study';

const meta: Meta<typeof RelatedStudy> = {
  title: 'Molecules/Mira/RelatedStudy',
  component: RelatedStudy,
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
type Story = StoryObj<typeof RelatedStudy>;

export const Default: Story = {};
