import { Meta, StoryObj } from '@storybook/react';
import { ArticleAndAuthorInformation } from './article-and-author-information';
import { authors, authorNotes, versionHistory } from '../../../utils/mocks';

const meta: Meta<typeof ArticleAndAuthorInformation> = {
  title: 'Molecules/ArticleAndAuthorInformation',
  component: ArticleAndAuthorInformation,
};

export default meta;
type Story = StoryObj<typeof ArticleAndAuthorInformation>;

export const ArticleAndAuthorsInformationProps: Story = {
  args: {
    authors,
    authorNotes,
    versions: versionHistory,
  },
  storyName: 'Article and Author Information',
};
