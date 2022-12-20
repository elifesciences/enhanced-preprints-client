import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Clipboard } from './clipboard';

export default {
  title: 'Atoms/ Clipboard',
  component: Clipboard,
} as ComponentMeta<typeof Clipboard>;

const Template: ComponentStory<typeof Clipboard> = () => <Clipboard />;

export const ClipboardContainer = Template.bind({});
