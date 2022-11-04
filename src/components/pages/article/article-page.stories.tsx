import LinkTo from '@storybook/addon-links/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const tabs = [
  {
    id: 'fulltext',
    element: <LinkTo story='Article-Page-Full-Text-Tab'>Full text</LinkTo>,
  },
  {
    id: 'figures',
    element: <LinkTo story='Article-Page-Figures-Tab'>Figures and data</LinkTo>,
  },
  {
    id: 'reviews',
    element: <LinkTo story='Article-Page-Reviews-Tab'>Peer review</LinkTo>,
  },
];

const FullTextTemplate: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage tabs={tabs} {...args}><ArticleFullTextTab metaData={metaData} peerReview={peerReview} content={content} /></ArticlePage>;
export const ArticlePageFullTextTab = FullTextTemplate.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
  activeTab: 'fulltext',
};

const FiguresTemplate: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage tabs={tabs} {...args}><ArticleFiguresTab content={content} /></ArticlePage>;
export const ArticlePageFiguresTab = FiguresTemplate.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
  activeTab: 'figures',
};

const ReviewsTemplate: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage tabs={tabs} {...args}><ArticleReviewsTab peerReview={peerReview} /></ArticlePage>;
export const ArticlePageReviewsTab = ReviewsTemplate.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
  activeTab: 'reviews',
};
