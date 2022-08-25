import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Title } from './title';

export default {
  title: 'Atoms/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const ArticleTitle = Template.bind({});
ArticleTitle.args = {
  title: 'I am an article string title!',
};

export const ArticleTitle2 = Template.bind({});
ArticleTitle2.args = {
  title: ['I am an article ', 'title', ' array!'],
};

export const ArticleTitle3 = Template.bind({});
ArticleTitle3.args = {
  title: { type: 'Emphasis', content: 'I am an emphasised title' },
};

export const ArticleTitle4 = Template.bind({});
ArticleTitle4.args = {
  title: ['I am a ', { type: 'Emphasis', content: 'partially' }, ' emphasised title'],
};

export const ArticleTitle5 = Template.bind({});
ArticleTitle5.args = {
  title: ['I am a ', { type: 'Emphasis', content: [{ type: 'Superscript', content: 'partially emphasised superscript' }] }, 'title'],
};

export const ArticleTitle6 = Template.bind({});
ArticleTitle6.args = {
  title: ['I am a ', { type: 'Emphasis', content: ['partially emphasised ', { type: 'Superscript', content: 'superscript' }] }, ' title'],
};

export const ArticleTitle7 = Template.bind({});
ArticleTitle7.args = {
  title: ['I am a ', { type: 'Emphasis', content: ['partially emphasised ', { type: 'Superscript', content: [{ type: 'Superscript', content: 'superscript' }, { type: 'Subscript', content: 'text' }] }] }, ' title'],
};
