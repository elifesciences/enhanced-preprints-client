import { StoryFn, Meta } from '@storybook/react';
import { Abstract } from './abstract';
import { content } from '../../../utils/mocks';

export default {
  title: 'Atoms/Abstract',
  component: Abstract,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'heading-order', enabled: false },
          { id: 'image-alt', enabled: false },
        ],
      },
    },
  },
} as Meta<typeof Abstract>;

const Template: StoryFn<typeof Abstract> = (args) => (
  <Abstract {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content,
};
