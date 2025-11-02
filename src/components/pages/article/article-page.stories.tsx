import LinkTo from '@storybook/addon-links/react';
import { type Meta, type StoryObj } from '@storybook/react';
import {
  content, metaData, metrics, peerReview, relatedContent, timeline,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';
import { DefaultLayout } from '../../layouts/default';
import { ErrorMessages } from '../../atoms/error-messages/error-messages';
import { contentToHeadings, contentToJsx } from '../../../utils/content';
import '../../../i18n';
import { type PeerReview } from '../../../types';

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

export const ArticlePageFullTextTabWithLicenseAndCopyrightYear: Story = {
  args: {
    metaData: {
      ...metaData,
      publishedYear: 2022,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      copyrightYear: 2021,
    },
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
        <ArticleFullTextTab metrics={metrics} headings={headings} metaData={args.metaData} peerReview={peerReview} content={jsxContent} />
      </ArticlePage>
    </DefaultLayout>
  ),
};

export const ArticlePageFullTextTabNoSummary: Story = {
  args: {
    metaData,
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

const peerReviewNoEditors = {
  ...peerReview,
  evaluationSummary: {
    ...peerReview.evaluationSummary,
    participants: [],
  },
} as PeerReview;

export const ArticlePageReviewedNoEditorsReviewsTab: Story = {
  args: {
    metaData: {
      ...metaData,
      version: '1',
    },
    activeTab: 'reviews',
    tabs,
    relatedContent,
    metrics,
    timeline,
  },
  render: (args) => (
    <DefaultLayout>
      <ArticlePage {...args}>
        <ArticleReviewsTab peerReview={peerReviewNoEditors} currentVersion={1} />
      </ArticlePage>
    </DefaultLayout>
  ),
};

export const ArticlePageRevisedReviewsTab: Story = {
  args: {
    metaData,
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

export const ArticlePageRevisedReviewsTabNoSummary: Story = {
  args: {
    metaData,
    activeTab: 'reviews',
    tabs,
    relatedContent,
    metrics,
    timeline,
  },
  render: (args) => {
    const { reviews, authorResponse } = peerReview;

    return (
      <DefaultLayout>
        <ArticlePage {...args}>
          <ArticleReviewsTab peerReview={{ reviews, authorResponse }} currentVersion={2} />
        </ArticlePage>
      </DefaultLayout>
    );
  },
};

export const ArticlePageErrorTab: Story = {
  args: {
    metaData,
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

export const ArticlePageRetractionNotice: Story = {
  args: {
    metaData,
    activeTab: 'fulltext',
    tabs,
    relatedContent,
    metrics,
    previousVersionWarningUrl: '#',
    retractionNoticeUrl: '#',
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
