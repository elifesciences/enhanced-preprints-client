import { StoryFn, Meta } from '@storybook/react';

import { Descriptors } from './descriptors';

export default {
  title: 'Atoms/Descriptors',
  component: Descriptors,
} as Meta<typeof Descriptors>;

const Template: StoryFn<typeof Descriptors> = (args) => <Descriptors {...args} />;

export const DescriptorsList = Template.bind({});
DescriptorsList.args = {
  doi: '10.1101/2020.04.07.030213',
  license: 'https://creativecommons.org/licenses/by/4.0',
};
