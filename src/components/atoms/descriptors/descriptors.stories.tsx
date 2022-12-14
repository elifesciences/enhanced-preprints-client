import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Descriptors } from './descriptors';

export default {
  title: 'Atoms/Descriptors',
  component: Descriptors,
} as ComponentMeta<typeof Descriptors>;

const Template: ComponentStory<typeof Descriptors> = (args) => <Descriptors {...args} />;

export const DescriptorsList = Template.bind({});
DescriptorsList.args = {
  doi: '10.1101/2020.04.07.030213',
};
