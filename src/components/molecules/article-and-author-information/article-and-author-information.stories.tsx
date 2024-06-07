import { StoryFn, Meta } from '@storybook/react';
import { ArticleAndAuthorInformation } from './article-and-author-information';
import { authors, versionHistory } from '../../../utils/mocks';

export default {
  title: 'Molecules/ArticleAndAuthorInformation',
  component: ArticleAndAuthorInformation,
} as Meta<typeof ArticleAndAuthorInformation>;

const Template: StoryFn<typeof ArticleAndAuthorInformation> = (args) => (
  <ArticleAndAuthorInformation {...args} />
);

export const ArticleAndAuthorsInformationProps = Template.bind({});
ArticleAndAuthorsInformationProps.args = {
  authors,
  versions: versionHistory,
};

ArticleAndAuthorsInformationProps.storyName = 'Article and Author Information';
