import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Title } from './title';

export default {
  title: 'Atoms/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const ArticleTitle = Template.bind({});
ArticleTitle.args = {
  title: 'I am an article title!',
};
