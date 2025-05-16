import { Meta, StoryObj } from '@storybook/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';
import '../../../i18n';

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

export const ReferenceBookStory: Story = {
  args: {
    reference: references[1],
  },
};

export const ReferenceGroupStory: Story = {
  args: {
    reference: references[2],
  },
};

export const ReferenceWithComment: Story = {
  args: {
    reference: {
      ...references[3],
      comments: [{
        type: 'Comment',
        commentAspect: 'In press',
      }],
    },
  },
};

export const ReferenceWithElocationId: Story = {
  args: {
    reference: references[4],
  },
};

export const ReferenceWithPubmedLink: Story = {
  args: {
    reference: references[0],
  },
};
