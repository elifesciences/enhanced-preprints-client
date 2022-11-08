import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePage } from './article-page';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { DefaultLayout } from '../../layouts/default';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args} /></DefaultLayout>;

export const ArticlePageStory = Template.bind({});
ArticlePageStory.args = {
  content,
  metaData,
  status,
  peerReview,
};
