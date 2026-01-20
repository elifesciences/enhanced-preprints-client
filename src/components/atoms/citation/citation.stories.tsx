import { type Meta, type StoryObj } from '@storybook/nextjs';
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
