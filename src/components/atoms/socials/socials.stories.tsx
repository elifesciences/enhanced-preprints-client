import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Socials } from './socials';

export default {
  title: 'Atoms/ Socials',
  component: Socials,
} as ComponentMeta<typeof Socials>;

const Template: ComponentStory<typeof Socials> = (args) => <Socials {...args} />;

export const SocialsContainer = Template.bind({});
SocialsContainer.args = {
  emailUrl: 'mailto:?subject=Some%20article%20title&amp;body=https%3A%2F%2Fexample.com%2Fsome-article-url',
  facebookUrl: 'https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fsome-article-url',
  twitterUrl: 'https://twitter.com/intent/tweet/?text=Some%20article%20title&amp;url=https%3A%2F%2Fexample.com%2Fsome-article-url',
  linkedinUrl: 'https://www.linkedin.com/company/elife-sciences-publications-ltd',
  redditUrl: 'https://reddit.com/submit/?url=https%3A%2F%2Fexample.com%2Fsome-article-url',
};
