import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DownloadButton = Template.bind({});
DownloadButton.args = {
  text: 'Download',
  iconName: 'download',
};

export const ShareButton = Template.bind({});
ShareButton.args = {
  text: 'Share',
  iconName: 'share',
};

export const CiteButton = Template.bind({});
CiteButton.args = {
  text: 'Cite',
  iconName: 'format_quote',
};

export const FollowButton = Template.bind({});
FollowButton.args = {
  text: 'Follow',
  iconName: 'notifications',
};
