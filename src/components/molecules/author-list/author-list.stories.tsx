import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthorList } from './author-list';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Molecules/AuthorList',
  component: AuthorList,
} as ComponentMeta<typeof AuthorList>;

const Template: ComponentStory<typeof AuthorList> = (args) => (
  <AuthorList {...args} />
);

export const Authors = Template.bind({});
Authors.args = {
  authors,
};
