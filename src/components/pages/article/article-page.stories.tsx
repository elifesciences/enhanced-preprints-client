import LinkTo from '@storybook/addon-links/react';
import { StoryFn, Meta } from '@storybook/react';
import {
  content, metaData, metrics, peerReview, relatedContent, status, timeline,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';
import { DefaultLayout } from '../../layouts/default';
import { ErrorMessages } from '../../atoms/error-messages/error-messages';
import { contentToHeadings, contentToJsx } from '../../../utils/content';

export default {
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
} as Meta<typeof ArticlePage>;

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

const FullTextTemplate: StoryFn<typeof ArticlePage> = (args) => <DefaultLayout>
  <ArticlePage {...args}>
    <ArticleFullTextTab metrics={metrics} headings={headings} metaData={metaData} peerReview={peerReview} content={jsxContent} />
  </ArticlePage>
</DefaultLayout>;
export const ArticlePageFullTextTab = FullTextTemplate.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
  activeTab: 'fulltext',
  tabs,
  relatedContent,
  metrics,
  previousVersionWarningUrl: '#',
  timeline,
};

const FiguresTemplate: StoryFn<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ArticleFiguresTab content={jsxContent} /></ArticlePage></DefaultLayout>;
export const ArticlePageFiguresTab = FiguresTemplate.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
  activeTab: 'figures',
  tabs,
  relatedContent,
  metrics,
  timeline,
};

const ReviewsTemplate: StoryFn<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ArticleReviewsTab peerReview={peerReview} /></ArticlePage></DefaultLayout>;
export const ArticlePageReviewsTab = ReviewsTemplate.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
  activeTab: 'reviews',
  tabs,
  relatedContent,
  metrics,
  timeline,
};

const ErrorTemplate: StoryFn<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ErrorMessages/></ArticlePage></DefaultLayout>;
export const ArticlePageErrorTab = ErrorTemplate.bind({});
ArticlePageErrorTab.args = {
  metaData,
  status,
  activeTab: 'reviews',
  tabs,
  relatedContent,
  metrics,
  timeline,
};
