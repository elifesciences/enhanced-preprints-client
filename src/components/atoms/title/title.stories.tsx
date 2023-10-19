import { StoryFn, Meta } from '@storybook/react';
import { Title } from './title';

export default {
  title: 'Atoms/Title',
  component: Title,
} as Meta<typeof Title>;

const Template: StoryFn<typeof Title> = (args) => <Title {...args} />;

export const StringTitle = Template.bind({});
StringTitle.args = {
  title: 'This is a title',
};

export const StringArrayTitle = Template.bind({});
StringArrayTitle.args = {
  title: ['This', 'is', 'a', 'title'],
};

export const ContentPartTitle = Template.bind({});
ContentPartTitle.args = {
  title: { type: 'Strong', content: 'This is a title' },
};

export const ContentPartArrayTitle = Template.bind({});
ContentPartArrayTitle.args = {
  title: [{ type: 'Strong', content: 'This is a' }, { type: 'Emphasis', content: 'title' }],
};

export const MixedArrayTitle = Template.bind({});
MixedArrayTitle.args = {
  title: [{ type: 'Strong', content: 'This is a' }, 'title'],
};

export const StringArrayInContentPartTitle = Template.bind({});
StringArrayInContentPartTitle.args = {
  title: [{ type: 'Strong', content: ['This', 'is', 'a', 'title'] }],
};

export const NestedContentPartTitle = Template.bind({});
NestedContentPartTitle.args = {
  title: [{ type: 'Strong', content: { type: 'Emphasis', content: 'This is a title' } }],
};
