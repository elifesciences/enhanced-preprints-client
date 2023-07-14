import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Figure } from './figure';

export default {
  title: 'Atoms/Figure',
  component: Figure,
} as ComponentMeta<typeof Figure>;

const Template: ComponentStory<typeof Figure> = (args) => (
  <Figure {...args} />
);

export const Figure1 = Template.bind({});
Figure1.args = {
  content: {
    type: 'Figure',
    content: {
      type: 'ImageObject',
      meta: {
        inline: false,
      },
      contentUrl: 'https://placekitten.com/800/400',
    },
  },
};

export const Figure2 = Template.bind({});
Figure2.args = {
  content: {
    type: 'Figure',
    label: 'This is a figure Component',
    caption: [
      {
        type: 'Heading',
        content: 'This is a figure',
        depth: 3,
        id: 'fig1',
      },
      'This is a figure caption that describes what the image is',
    ],
    id: '1',
    content: {
      type: 'ImageObject',
      meta: {
        inline: false,
      },
      contentUrl: 'https://placekitten.com/800/400',
    },
  },
};
