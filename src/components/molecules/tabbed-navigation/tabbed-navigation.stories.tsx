import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tab, TabbedNavigation } from '.';

export default {
  title: 'Molecules/TabbedNavigation',
  component: TabbedNavigation,
} as ComponentMeta<typeof TabbedNavigation>;

const Template: ComponentStory<typeof TabbedNavigation> = (args) => (
<TabbedNavigation {...args}>
  <Tab label="tabs">Test</Tab>
  <Tab label="tabs2">
    <div><strong>foo</strong></div>
    <img src="https://placekitten.com/300/400" />
  </Tab>
</TabbedNavigation>
);

export const MultipleTabbedNavigation = Template.bind({});
