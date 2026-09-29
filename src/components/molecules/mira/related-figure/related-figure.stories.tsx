import { type Meta, type StoryObj } from '@storybook/nextjs';
import { RelatedFigure } from './related-figure';
import figure4 from '../../../../../public/mira/figure-4.jpg';

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

export const Default: Story = {
  args: {
    name: 'Figure 4',
    image: figure4,
    title: 'BOLD responses.',
    // eslint-disable-next-line @stylistic/max-len
    summary: 'Regions active during risky choices (A), social decision-making (B), with TPJ and precuneus most active during participant\'s risky social choices (C). Anterior insula responded to low partner outcomes from participant choices (D–F). Ventral striatum tracked participant rewards (G), while left STS tracked partner prediction errors from participant decisions (H–I).',
  },
};
