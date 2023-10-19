import { StoryFn, Meta } from '@storybook/react';

import { Heading } from './heading';

export default {
  title: 'Atoms/Heading',
  component: Heading,
} as Meta<typeof Heading>;

const Template: StoryFn<typeof Heading> = (args) => <Heading {...args} />;

export const H1 = Template.bind({});
H1.args = {
  content: 'I am an h1',
  headingLevel: 1,
  id: 'h1',
};

export const H2 = Template.bind({});
H2.args = {
  content: 'I am an h2',
  headingLevel: 2,
  id: 'h2',
};

export const H3 = Template.bind({});
H3.args = {
  content: 'I am an h3',
  headingLevel: 3,
  id: 'h3',
};

export const H4 = Template.bind({});
H4.args = {
  content: 'I am an h4',
  headingLevel: 4,
  id: 'h4',
};

export const H5 = Template.bind({});
H5.args = {
  content: 'I am an h5',
  headingLevel: 5,
  id: 'h5',
};

export const H6 = Template.bind({});
H6.args = {
  content: 'I am an h6',
  headingLevel: 6,
  id: 'h6',
};
