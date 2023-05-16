import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticlePageLayout } from './article-page';
import { DefaultLayout } from '../../layouts/default/default';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../pages/article/tabs';

export default {
  title: 'Layout/Article Page Layout',
  component: ArticlePageLayout,
} as ComponentMeta<typeof ArticlePageLayout>;

const FullTextTemplate: ComponentStory<typeof ArticlePageLayout> = (args) => <DefaultLayout>
  <ArticlePageLayout {...args}>
    <ArticleFullTextTab metaData={metaData} peerReview={peerReview} content={content} />
  </ArticlePageLayout>
</DefaultLayout>;
export const ArticlePageFullTextTab = FullTextTemplate.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
};

const FiguresTemplate: ComponentStory<typeof ArticlePageLayout> = (args) => <DefaultLayout>
  <ArticlePageLayout {...args}>
    <ArticleFiguresTab content={content} />
  </ArticlePageLayout>
</DefaultLayout>;
export const ArticlePageFiguresTab = FiguresTemplate.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
};

const ReviewsTemplate: ComponentStory<typeof ArticlePageLayout> = (args) => <DefaultLayout>
  <ArticlePageLayout {...args}>
    <ArticleReviewsTab peerReview={peerReview} />
  </ArticlePageLayout>
</DefaultLayout>;
export const ArticlePageReviewsTab = ReviewsTemplate.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
};
