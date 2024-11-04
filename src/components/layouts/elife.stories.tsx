import { StoryFn, Meta } from '@storybook/react';
import { ELifeLayout } from './elife';

export default {
  title: 'Layout/Default',
  component: ELifeLayout,
} as Meta<typeof ELifeLayout>;

const Template: StoryFn<typeof ELifeLayout> = () => <ELifeLayout>Hello</ELifeLayout>;

export const ELifeLayoutStory = Template.bind({});
ELifeLayoutStory.args = {};
