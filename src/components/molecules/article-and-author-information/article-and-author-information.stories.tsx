import { Meta, StoryObj } from '@storybook/react';
import { ArticleAndAuthorInformation } from './article-and-author-information';
import { authors, authorNotes, versionHistory } from '../../../utils/mocks';

const meta: Meta<typeof ArticleAndAuthorInformation> = {
  title: 'Molecules/ArticleAndAuthorInformation',
  component: ArticleAndAuthorInformation,
};

export default meta;
type Story = StoryObj<typeof ArticleAndAuthorInformation>;

export const ArticleAndAuthorsInformation: Story = {
  args: {
    authors,
    authorNotes,
    versions: versionHistory,
  },
  storyName: 'Article and Author Information',
};

export const ArticleAndAuthorsInformationWithLicense: Story = {
  args: {
    authors,
    authorNotes,
    versions: versionHistory,
    license: 'http://creativecommons.org/licenses/by/4.0/',
    copyrightYear: 2021,
  },
  storyName: 'Article and Author Information',
};
