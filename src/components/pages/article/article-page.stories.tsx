import LinkTo from '@storybook/addon-links/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  content, metaData, peerReview, status,
} from '../../../utils/mocks';
import { ArticlePage } from './article-page';
import { ArticleFullTextTab, ArticleFiguresTab, ArticleReviewsTab } from './tabs';
import { DefaultLayout } from '../../layouts/default';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
          { id: 'heading-order', enabled: false },
          { id: 'image-alt', enabled: false },
          { id: 'landmark-unique', enabled: false },
          { id: 'link-in-text-block', enabled: false },
        ],
      },
    },
  },
} as ComponentMeta<typeof ArticlePage>;

const tabs = [
  {
    id: 'fulltext',
    linkElement: <LinkTo story='Article-Page-Full-Text-Tab'>Full text</LinkTo>,
  },
  {
    id: 'figures',
    linkElement: <LinkTo story='Article-Page-Figures-Tab'>Figures and data</LinkTo>,
  },
  {
    id: 'reviews',
    linkElement: <LinkTo story='Article-Page-Reviews-Tab'>Peer review</LinkTo>,
  },
];

const FullTextTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage tabs={tabs} {...args}><ArticleFullTextTab metaData={metaData} peerReview={peerReview} content={content} /></ArticlePage></DefaultLayout>;
export const ArticlePageFullTextTab = FullTextTemplate.bind({});
ArticlePageFullTextTab.args = {
  metaData,
  status,
  activeTab: 'fulltext',
};

const FiguresTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage tabs={tabs} {...args}><ArticleFiguresTab content={content} /></ArticlePage></DefaultLayout>;
export const ArticlePageFiguresTab = FiguresTemplate.bind({});
ArticlePageFiguresTab.args = {
  metaData,
  status,
  activeTab: 'figures',
};

const ReviewsTemplate: ComponentStory<typeof ArticlePage> = (args) => <DefaultLayout><ArticlePage tabs={tabs} {...args}><ArticleReviewsTab peerReview={peerReview} /></ArticlePage></DefaultLayout>;
export const ArticlePageReviewsTab = ReviewsTemplate.bind({});
ArticlePageReviewsTab.args = {
  metaData,
  status,
  activeTab: 'reviews',
};
