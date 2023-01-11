import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, buttonIconNames, buttonVariants } from './button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: [
        '',
        ...buttonVariants,
      ],
      control: { type: 'radio', labels: { '': 'None' } },
    },
    iconName: {
      options: [
        '',
        ...buttonIconNames,
      ],
      control: { type: 'select', labels: { '': 'None' } },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: 'Back to homepage',
  url: '#',
};

export const ActionButton = Template.bind({});
ActionButton.args = {
  text: 'Action button',
  url: '#',
  variant: 'action',
};

export const DownloadButton = Template.bind({});
DownloadButton.args = {
  text: 'Download',
  iconName: 'download',
  url: '#',
  variant: 'action',
};

export const ShareButton = Template.bind({});
ShareButton.args = {
  text: 'Share',
  iconName: 'share',
  url: '#',
  variant: 'action',
};

export const CiteButton = Template.bind({});
CiteButton.args = {
  text: 'Cite',
  iconName: 'citation',
  url: '#',
  variant: 'action',
};

export const FollowButton = Template.bind({});
FollowButton.args = {
  text: 'Follow',
  iconName: 'follow',
  url: '#',
  variant: 'action',
};
