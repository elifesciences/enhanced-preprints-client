import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Abstract } from './abstract';
import { content } from '../../../utils/mocks';

export default {
  title: 'Atoms/Abstract',
  component: Abstract,
} as ComponentMeta<typeof Abstract>;

const Template: ComponentStory<typeof Abstract> = (args) => (
  <Abstract {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content,
};
