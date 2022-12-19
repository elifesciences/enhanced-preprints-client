import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: 'Back to Homepage',
  iconName: 'default',
  url: '#',
};

export const DownloadButton = Template.bind({});
DownloadButton.args = {
  text: 'Download',
  iconName: 'download',
  url: '#',
};

export const ShareButton = Template.bind({});
ShareButton.args = {
  text: 'Share',
  iconName: 'share',
  url: '#',
};

export const CiteButton = Template.bind({});
CiteButton.args = {
  text: 'Citation',
  iconName: 'citation',
  url: '#',
};

export const FollowButton = Template.bind({});
FollowButton.args = {
  text: 'Follow',
  iconName: 'follow',
  url: '#',
};

export const EmailButton = Template.bind({});
EmailButton.args = {
  text: 'Email',
  iconName: 'email',
  url: '#',
};
