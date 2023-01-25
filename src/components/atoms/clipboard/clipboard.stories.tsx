import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Clipboard } from './clipboard';

export default {
  title: 'Atoms/Clipboard',
  component: Clipboard,
} as ComponentMeta<typeof Clipboard>;

const Template: ComponentStory<typeof Clipboard> = (args) => <Clipboard {...args} />;

export const ClipboardContainer = Template.bind({});
ClipboardContainer.args = {
  text: 'https://doi.org/10.7554/eLife.09560',
};

export const ButtonTextClipboardContainer = Template.bind({});
ButtonTextClipboardContainer.args = {
  buttonText: 'Copy foo to clipboard',
  text: 'foo',
};
