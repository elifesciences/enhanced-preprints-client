import { StoryFn, Meta } from '@storybook/react';
import { AuthorList } from './author-list';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Atoms/AuthorList',
  component: AuthorList,
} as Meta<typeof AuthorList>;

const Template: StoryFn<typeof AuthorList> = (args) => (
  <AuthorList {...args} />
);

export const AuthorListProps = Template.bind({});
AuthorListProps.args = {
  authors,
};

AuthorListProps.storyName = 'Author List';
