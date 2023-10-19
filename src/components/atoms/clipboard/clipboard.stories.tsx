import { StoryFn, Meta } from '@storybook/react';
import { Clipboard } from './clipboard';

export default {
  title: 'Atoms/Clipboard',
  component: Clipboard,
} as Meta<typeof Clipboard>;

const Template: StoryFn<typeof Clipboard> = (args) => <Clipboard {...args} />;

export const ClipboardContainer = Template.bind({});
ClipboardContainer.args = {
  text: 'https://doi.org/10.7554/eLife.09560',
};

export const ButtonTextClipboardContainer = Template.bind({});
ButtonTextClipboardContainer.args = {
  buttonText: 'Copy foo to clipboard',
  text: 'foo',
};
