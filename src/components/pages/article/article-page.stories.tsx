import LinkTo from '@storybook/addon-links/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';
import { DefaultLayout } from '../../layouts/default';
import { ErrorMessages } from '../../atoms/error-messages/error-messages';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

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

const FullTextTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ArticleFullTextTab metaData={metaData} peerReview={peerReview} content={content} /></ArticlePage></DefaultLayout>;
export const ArticlePageFullTextTab = FullTextTemplate.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
  activeTab: 'fulltext',
  tabs,
};

const FiguresTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ArticleFiguresTab content={content} /></ArticlePage></DefaultLayout>;
export const ArticlePageFiguresTab = FiguresTemplate.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
  activeTab: 'figures',
  tabs,
};

const ReviewsTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ArticleReviewsTab peerReview={peerReview} /></ArticlePage></DefaultLayout>;
export const ArticlePageReviewsTab = ReviewsTemplate.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
  activeTab: 'reviews',
  tabs,
};

const ErrorTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage {...args}><ErrorMessages/></ArticlePage></DefaultLayout>;
export const ArticlePageErrorTab = ErrorTemplate.bind({});
ArticlePageErrorTab.args = {
  metaData,
  status,
  activeTab: 'reviews',
  tabs,
};
