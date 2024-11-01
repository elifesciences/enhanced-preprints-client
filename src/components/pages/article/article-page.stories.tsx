import LinkTo from '@storybook/addon-links/react';
import { Meta, StoryObj } from '@storybook/react';
import {
  content, metaData, metrics, peerReview, relatedContent, status, timeline,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';
import { DefaultLayout } from '../../layouts/default';
import { ErrorMessages } from '../../atoms/error-messages/error-messages';
import { contentToHeadings, contentToJsx } from '../../../utils/content';
import '../../../i18n';

const meta: Meta<typeof ArticlePage> = {
  title: 'Pages/Article Page',
  component: ArticlePage,
  parameters: {
    chromatic: {
      modes: {
        small: {
          viewport: 'small',
        },
        medium: {
          viewport: 'medium',
        },
        large: {
          viewport: 'large',
        },
        extraLarge: {
          viewport: 'extraLarge',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePage>;

const tabs = [
  {
    id: 'fulltext',
    linkElement: <LinkTo story='Article-Page-Full-Text-Tab'>Full text</LinkTo>,
  },
  {
    id: 'figures',
    linkElement: <LinkTo story='Article-Page-Figures-Tab'>Figures</LinkTo>,
  },
  {
    id: 'reviews',
    linkElement: <LinkTo story='Article-Page-Reviews-Tab'>Peer review</LinkTo>,
  },
];

const jsxContent = contentToJsx(content);
const headings = contentToHeadings(content);

export const ArticlePageFullTextTab: Story = {
  args: {
    metaData,
    status,
    activeTab: 'fulltext',
    tabs,
    relatedContent,
    metrics,
    previousVersionWarningUrl: '#',
    timeline,
  },
  render: (args) => (
    <DefaultLayout>
      <ArticlePage {...args}>
        <ArticleFullTextTab metrics={metrics} headings={headings} metaData={metaData} peerReview={peerReview} content={jsxContent} />
      </ArticlePage>
    </DefaultLayout>
  ),
};

export const ArticlePageFullTextTabNoSummary: Story = {
  args: {
    metaData,
    status,
    activeTab: 'fulltext',
    tabs,
    relatedContent,
    metrics,
    previousVersionWarningUrl: '#',
    timeline,
  },
  render: (args) => {
    const { reviews, authorResponse } = peerReview;

    return (
      <DefaultLayout>
        <ArticlePage {...args}>
          <ArticleFullTextTab metrics={metrics} headings={headings} metaData={metaData} peerReview={{ reviews, authorResponse }} content={jsxContent} />
        </ArticlePage>
      </DefaultLayout>
    );
  },
};

export const ArticlePageFiguresTab: Story = {
  args: {
    metaData,
    status,
    activeTab: 'figures',
    tabs,
    relatedContent,
    metrics,
    timeline,
  },
  render: (args) => (
    <DefaultLayout>
      <ArticlePage {...args}>
        <ArticleFiguresTab content={jsxContent} />
      </ArticlePage>
    </DefaultLayout>
  ),
};

export const ArticlePageReviewedReviewsTab: Story = {
  args: {
    metaData: {
      ...metaData,
      version: '1',
    },
    status,
    activeTab: 'reviews',
    tabs,
    relatedContent,
    metrics,
    timeline,
  },
  render: (args) => (
    <DefaultLayout>
      <ArticlePage {...args}>
        <ArticleReviewsTab peerReview={peerReview} currentVersion={1} />
      </ArticlePage>
    </DefaultLayout>
  ),
};

export const ArticlePageRevisedReviewsTab: Story = {
  args: {
    metaData,
    status,
    activeTab: 'reviews',
    tabs,
    relatedContent,
    metrics,
    timeline,
  },
  render: (args) => (
    <DefaultLayout>
      <ArticlePage {...args}>
        <ArticleReviewsTab peerReview={peerReview} currentVersion={2} />
      </ArticlePage>
    </DefaultLayout>
  ),
};

export const ArticlePageErrorTab: Story = {
  args: {
    metaData,
    status,
    activeTab: 'reviews',
    tabs,
    relatedContent,
    metrics,
    timeline,
  },
  render: (args) => (
    <DefaultLayout>
      <ArticlePage {...args}>
        <ErrorMessages/>
      </ArticlePage>
    </DefaultLayout>
  ),
};
