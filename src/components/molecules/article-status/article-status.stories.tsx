import { Meta, StoryObj } from '@storybook/react';
import { citation, metrics } from '../../../utils/mocks';
import { ArticleStatus } from './article-status';
import '../../../i18n';

const meta: Meta<typeof ArticleStatus> = {
  title: 'Molecules/ArticleStatus',
  component: ArticleStatus,
};

export default meta;
type Story = StoryObj<typeof ArticleStatus>;

export const Status: Story = {
  args: {
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
  },
};
