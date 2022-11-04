import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticlePageLayout } from './article-page-layout';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const tabs = [
  {
    id: 'fulltext',
    element: <a href='?path=/story/pages-article-page--article-page-full-text-tab'>Full text</a>,
  },
  {
    id: 'figures',
    element: <a href='?path=/story/pages-article-page--article-page-figures-tab'>Figures and data</a>,
  },
  {
    id: 'reviews',
    element: <a href='?path=/story/pages-article-page--article-page-reviews-tab'>Peer review</a>,
  },
];

const FullTextTemplate: ComponentStory<typeof ArticlePage> = (args) => <ArticlePageLayout tabs={tabs} activeTab='fulltext' {...args}><ArticleFullTextTab metaData={metaData} peerReview={peerReview} content={content} /></ArticlePageLayout>;
export const ArticlePageFullTextTab = FullTextTemplate.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
};

const FiguresTemplate: ComponentStory<typeof ArticlePage> = (args) => <ArticlePageLayout tabs={tabs} activeTab='figures' {...args}><ArticleFiguresTab content={content} /></ArticlePageLayout>;
export const ArticlePageFiguresTab = FiguresTemplate.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
};

const ReviewsTemplate: ComponentStory<typeof ArticlePage> = (args) => <ArticlePageLayout tabs={tabs} activeTab='reviews' {...args}><ArticleReviewsTab peerReview={peerReview} /></ArticlePageLayout>;
export const ArticlePageReviewsTab = ReviewsTemplate.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
};
