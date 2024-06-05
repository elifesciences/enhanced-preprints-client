import { StoryFn, Meta } from '@storybook/react';
import { AuthorInformationList } from './author-information-list';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Molecules/AuthorInformationList',
  component: AuthorInformationList,
} as Meta<typeof AuthorInformationList>;

const Template: StoryFn<typeof AuthorInformationList> = (args) => (
  <AuthorInformationList {...args} />
);

export const Authors = Template.bind({});
Authors.args = {
  authors,
  versions: [],
};
