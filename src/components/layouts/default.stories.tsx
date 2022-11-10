import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DefaultLayout } from './default';

export default {
  title: 'Layout/Default',
  component: DefaultLayout,
} as ComponentMeta<typeof DefaultLayout>;

const Template: ComponentStory<typeof DefaultLayout> = () => <DefaultLayout>Hello</DefaultLayout>;

export const DefaultLayoutStory = Template.bind({});
DefaultLayoutStory.args = {};
