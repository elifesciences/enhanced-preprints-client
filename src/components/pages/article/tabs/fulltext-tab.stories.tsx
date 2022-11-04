import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePage } from '../article-page';
import { ArticlePageLayout } from '../article-page-layout';
import { ArticleFullTextTab } from './fulltext-tab';
import {
  metaData, status, content, peerReview,
} from '../../../../utils/mocks';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePageLayout activeTab='fulltext' {...args}><ArticleFullTextTab {...args} /></ArticlePageLayout>;

export const ArticlePageFullTextTab = Template.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
  content,
  peerReview,
};
