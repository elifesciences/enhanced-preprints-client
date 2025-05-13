import { Meta, StoryObj } from '@storybook/react';
import { BiophysicsColabLayout } from './biophysics-colab';

const meta: Meta<typeof BiophysicsColabLayout> = {
  title: 'Layout/BiophysicsColab',
  component: BiophysicsColabLayout,
};

export default meta;
type Story = StoryObj<typeof BiophysicsColabLayout>;

export const BiophysicsColabLayoutStory: Story = {
  render: () => <div className='site-biophysics-colab'><BiophysicsColabLayout>Hello</BiophysicsColabLayout></div>,
};
