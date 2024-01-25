import { StoryFn, Meta } from '@storybook/react';
import { BiophysicsColabLayout } from './biophysics-colab';

export default {
  title: 'Layout/BiophysicsColab',
  component: BiophysicsColabLayout,
} as Meta<typeof BiophysicsColabLayout>;

const Template: StoryFn<typeof BiophysicsColabLayout> = () => <BiophysicsColabLayout>Hello</BiophysicsColabLayout>;

export const BiophysicsColabLayoutStory = Template.bind({});
BiophysicsColabLayoutStory.args = {};
