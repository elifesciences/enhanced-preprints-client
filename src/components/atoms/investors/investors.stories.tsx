import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Investors } from './investors';

export default {
  title: 'Atoms/Investors',
  component: Investors,
} as ComponentMeta<typeof Investors>;

const Template: ComponentStory<typeof Investors> = () => (
  <Investors />
);

export const Review = Template.bind({});
