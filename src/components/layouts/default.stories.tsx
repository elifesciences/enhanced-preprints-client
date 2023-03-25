import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DefaultLayout } from './default';

export default {
  title: 'Layout/Default',
  component: DefaultLayout,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'landmark-unique', enabled: false },
          { id: 'link-in-text-block', enabled: false },
        ],
      },
    },
  },
} as ComponentMeta<typeof DefaultLayout>;

const Template: ComponentStory<typeof DefaultLayout> = () => <DefaultLayout>Hello</DefaultLayout>;

export const DefaultLayoutStory = Template.bind({});
DefaultLayoutStory.args = {};
