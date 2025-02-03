import { Meta, StoryObj } from '@storybook/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';

const meta: Meta<typeof Reference> = {
  title: 'Atoms/Reference',
  component: Reference,
};

export default meta;
type Story = StoryObj<typeof Reference>;

export const ReferenceStory: Story = {
  args: {
    reference: references[0],
  },
};

export const ReferenceGroupStory: Story = {
  args: {
    reference: references[2],
  },
};

export const ReferenceIsReferenceList: Story = {
  args: {
    reference: references[0],
  },
};
