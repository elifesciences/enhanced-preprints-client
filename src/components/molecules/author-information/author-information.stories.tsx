import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthorInformation } from './author-information';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Molecules/AuthorList',
  component: AuthorInformation,
} as ComponentMeta<typeof AuthorInformation>;

const Template: ComponentStory<typeof AuthorInformation> = (args) => (
  <AuthorInformation {...args} />
);

export const Authors = Template.bind({});
Authors.args = {
  authors,
};
