import { StoryFn, Meta } from '@storybook/react';

import { Authors } from './authors';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Atoms/Authors',
  component: Authors,
} as Meta<typeof Authors>;

const Template: StoryFn<typeof Authors> = (args) => <Authors {...args} />;

export const AuthorList = Template.bind({});
AuthorList.args = {
  authors,
};
