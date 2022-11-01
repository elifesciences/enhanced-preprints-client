import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Authors } from './authors';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Atoms/Authors',
  component: Authors,
} as ComponentMeta<typeof Authors>;

const Template: ComponentStory<typeof Authors> = (args) => <Authors {...args} />;

export const AuthorList = Template.bind({});
AuthorList.args = {
  authors,
};
