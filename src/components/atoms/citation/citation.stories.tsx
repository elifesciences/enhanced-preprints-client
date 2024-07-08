import { Meta, StoryObj } from '@storybook/react';
import { Citation } from './citation';
import { citation } from '../../../utils/mocks';

const meta: Meta<typeof Citation> = {
  title: 'Atoms/Citation',
  component: Citation,
};

export default meta;
type Story = StoryObj<typeof Citation>;

export const CitationStory: Story = {
  args: {
    citation,
  },
};
