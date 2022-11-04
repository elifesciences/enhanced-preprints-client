import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePage } from '../article-page';
import { ArticlePageLayout } from '../article-page-layout';
import { metaData, status, peerReview } from '../../../../utils/mocks';
import { ArticleReviewsTab } from './reviews-tab';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePageLayout activeTab='reviews' {...args}><ArticleReviewsTab {...args} /></ArticlePageLayout>;

export const ArticlePageReviewsTab = Template.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
  peerReview,
};
