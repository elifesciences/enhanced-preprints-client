import { StoryFn, Meta } from '@storybook/react';

import { ContentHeader } from './content-header';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Molecules/ContentHeader',
  component: ContentHeader,
} as Meta<typeof ContentHeader>;

const Template: StoryFn<typeof ContentHeader> = (args) => <ContentHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  msas: ['Mad Science', 'Alchemy'],
  title: 'This is a title',
  doi: 'bbc.co.uk',
  authors,
  license: 'https://creativecommons.org/licenses/by/4.0/',
};
