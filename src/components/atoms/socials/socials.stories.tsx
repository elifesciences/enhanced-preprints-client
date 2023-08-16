import { StoryFn, Meta } from '@storybook/react';
import { Socials } from './socials';

export default {
  title: 'Atoms/Socials',
  component: Socials,
} as Meta<typeof Socials>;

const Template: StoryFn<typeof Socials> = (args) => <Socials {...args} />;

export const SocialsContainer = Template.bind({});
SocialsContainer.args = {
  title: 'some article',
  doi: 'www.example.com/some-article',
};
