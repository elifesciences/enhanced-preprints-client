import { StoryFn, Meta } from '@storybook/react';
import { citation } from '../../../utils/mocks';

import { ArticleStatus } from './article-status';

export default {
  title: 'Molecules/ArticleStatus',
  component: ArticleStatus,
} as Meta<typeof ArticleStatus>;

const Template: StoryFn<typeof ArticleStatus> = (args) => <ArticleStatus {...args} />;

export const Status = Template.bind({});
Status.args = {
  articleStatus: 'This article is made up for the purpose of a story and not reviewed',
  title: 'An Article',
  doi: '10.1101/123456',
  pdfUrl: '#',
  citation,
  msid: '12345',
  previousWarningFeature: true,
};
