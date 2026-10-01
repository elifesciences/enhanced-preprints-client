import { type Meta, type StoryObj } from '@storybook/nextjs';
import { MiraDetails } from './mira-details';

const meta: Meta<typeof MiraDetails> = {
  title: 'Molecules/Mira/MiraDetails',
  component: MiraDetails,
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
type Story = StoryObj<typeof MiraDetails>;

export const Default: Story = {};
