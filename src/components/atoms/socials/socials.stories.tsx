import { type Meta, type StoryObj } from '@storybook/react';
import { Socials } from './socials';
import '../../../i18n';

const meta: Meta<typeof Socials> = {
  title: 'Atoms/Socials',
  component: Socials,
};

export default meta;
type Story = StoryObj<typeof Socials>;

export const SocialsContainer: Story = {
  args: {
    title: 'some article',
    doi: 'www.example.com/some-article',
  },
};
