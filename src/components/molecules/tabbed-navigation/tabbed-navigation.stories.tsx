import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tab, TabbedNavigation } from '.';

export default {
  title: 'Molecules/TabbedNavigation',
  component: TabbedNavigation,
} as ComponentMeta<typeof TabbedNavigation>;

const Template: ComponentStory<typeof TabbedNavigation> = (args) => (
  <TabbedNavigation {...args}>
    <Tab label="Tab 1">
      <h2>Tab 1</h2>
      <p>Test</p>
    </Tab>
    <Tab label="Tab 2">
      <h2>Tab 2</h2>
      <img src="https://placekitten.com/300/400" alt="cat picture"/>
    </Tab>
  </TabbedNavigation>
);

export const MultipleTabbedNavigation = Template.bind({});
