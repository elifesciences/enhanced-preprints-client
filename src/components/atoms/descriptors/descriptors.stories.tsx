import { type Meta, type StoryObj } from '@storybook/react';

import { Descriptors } from './descriptors';

const meta: Meta<typeof Descriptors> = {
  title: 'Atoms/Descriptors',
  component: Descriptors,
};

export default meta;
type Story = StoryObj<typeof Descriptors>;

export const DescriptorsList: Story = {
  args: {
    doi: '10.1101/2020.04.07.030213',
    license: 'https://creativecommons.org/licenses/by/4.0',
  },
};
