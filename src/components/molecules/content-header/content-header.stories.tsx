import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ContentHeader } from './content-header';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Molecules/ContentHeader',
  component: ContentHeader,
} as ComponentMeta<typeof ContentHeader>;

const Template: ComponentStory<typeof ContentHeader> = (args) => <ContentHeader {...args} />;

export const Header = Template.bind({});
Header.args = {
  msas: ['Mad Science', 'Alchemy'],
  title: 'This is a title',
  doi: 'bbc.co.uk',
  authors,
};
