import { type Meta, type StoryObj } from '@storybook/react';

import { Button, buttonIconNames, buttonVariants } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: [
        '',
        ...buttonVariants,
      ],
      control: { type: 'select', labels: { '': 'None' } },
    },
    iconName: {
      options: [
        '',
        ...buttonIconNames,
      ],
      control: { type: 'select', labels: { '': 'None' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    text: 'Back to homepage',
    url: '#',
  },
};

export const ActionButton: Story = {
  args: {
    text: 'Action button',
    url: '#',
    variant: 'action',
  },
};

export const DownloadButton: Story = {
  args: {
    text: 'Download',
    iconName: 'download',
    url: '#',
    variant: 'action',
  },
};

export const ShareButton: Story = {
  args: {
    text: 'Share',
    iconName: 'share',
    url: '#',
    variant: 'action',
    rel: 'nofollow',
  },
};

export const CiteButton: Story = {
  args: {
    text: 'Cite',
    iconName: 'citation',
    url: '#',
    variant: 'action',
    rel: 'nofollow',
  },
};

export const FollowButton: Story = {
  args: {
    text: 'Follow',
    iconName: 'follow',
    url: '#',
    variant: 'action',
  },
};
