import { type Meta, type StoryObj } from '@storybook/nextjs';
import { RelatedFigure } from './related-figure';

const meta: Meta<typeof RelatedFigure> = {
  title: 'Molecules/Mira/RelatedFigure',
  component: RelatedFigure,
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
type Story = StoryObj<typeof RelatedFigure>;

export const Default: Story = {};
