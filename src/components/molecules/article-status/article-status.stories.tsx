import { StoryFn, Meta } from '@storybook/react';
import { citation, metrics } from '../../../utils/mocks';
import { ArticleStatus } from './article-status';

export default {
  title: 'Molecules/ArticleStatus',
  component: ArticleStatus,
} as Meta<typeof ArticleStatus>;

const Template: StoryFn<typeof ArticleStatus> = (args) => <ArticleStatus {...args} />;

export const Status = Template.bind({});
Status.args = {
  title: 'An Article',
  doi: '10.1101/123456',
  pdfUrl: '#',
  citation,
  msid: '12345',
  metrics,
  timeline: {
    events: [
      {
        url: '#',
        version: 1,
        versionIndicator: 'v1',
        date: new Date('2024-05-30'),
      },
    ],
  },
};
