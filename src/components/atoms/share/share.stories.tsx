import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Share } from './share';

export default {
  title: 'Atoms/ Share',
  component: Share,
} as ComponentMeta<typeof Share>;

const Template: ComponentStory<typeof Share> = () => <Share emailUrl={''} facebookUrl={''} twitterUrl={''} linkedinUrl={''} redditUrl={''} modalTitle={''} />;

export const ShareContainer = Template.bind({});
ShareContainer.args = {
  modalTitle: 'Share this article',
  emailUrl: 'mailto:?subject=Some%20article%20title&amp;body=https%3A%2F%2Fexample.com%2Fsome-article-url',
  facebookUrl: 'https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fsome-article-url',
  twitterUrl: 'https://twitter.com/intent/tweet/?text=Some%20article%20title&amp;url=https%3A%2F%2Fexample.com%2Fsome-article-url',
  linkedinUrl: 'https://www.linkedin.com/company/elife-sciences-publications-ltd',
  redditUrl: 'https://reddit.com/submit/?url=https%3A%2F%2Fexample.com%2Fsome-article-url',
};
