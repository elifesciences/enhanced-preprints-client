import { type Meta, type StoryObj } from '@storybook/nextjs';
import { TextCapsule } from './text-capsule';

const meta: Meta<typeof TextCapsule> = {
  title: 'Molecules/Mira/TextCapsule',
  component: TextCapsule,
};

export default meta;
type Story = StoryObj<typeof TextCapsule>;

export const Default: Story = {
  args: {
    text: 'Claim 1 generated from this text',
    href: '/mira/claims-tree/claim/1',
  },
};
