import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePage } from '../article-page';
import { ArticlePageLayout } from '../article-page-layout';
import { ArticleFiguresTab } from './figures-tab';
import { metaData, status, content } from '../../../../utils/mocks';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePageLayout activeTab='figures' {...args}><ArticleFiguresTab content={content} /></ArticlePageLayout>;

export const ArticlePageFiguresTab = Template.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
};
