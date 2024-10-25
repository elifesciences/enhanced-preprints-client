import { StoryFn, Meta } from '@storybook/react';
import { DefaultLayout } from './default';

export default {
  title: 'Layout/Default',
  component: DefaultLayout,
  tags: ['nolayout'],
} as Meta<typeof DefaultLayout>;

const Template: StoryFn<typeof DefaultLayout> = () => <DefaultLayout>Hello</DefaultLayout>;

export const DefaultLayoutStory = Template.bind({});
DefaultLayoutStory.args = {};
