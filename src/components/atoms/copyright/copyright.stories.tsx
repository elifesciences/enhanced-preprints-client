import { Meta, StoryObj } from '@storybook/react';

import { Copyright } from './copyright';
import { authors } from '../../../utils/mocks';

const meta: Meta<typeof Copyright> = {
  title: 'Atoms/Copyright',
  component: Copyright,
};

export default meta;
type Story = StoryObj<typeof Copyright>;

export const CopyrightLicenseWithMoreThanTwoAuthors: Story = {
  args: {
    license: 'http://creativecommons.org/licenses/by/4.0/',
    publishedYear: 2022,
    authors,
  },
};

export const CopyrightLicenseWithTwoAuthors: Story = {
  args: {
    license: 'http://creativecommons.org/licenses/by/4.0/',
    publishedYear: 2022,
    authors: [authors[0], authors[1]],
  },
};

export const CopyrightLicenseWithOneAuthor: Story = {
  args: {
    license: 'http://creativecommons.org/licenses/by/4.0/',
    publishedYear: 2022,
    authors: [authors[0]],
  },
};

export const CopyrightPublic: Story = {
  args: {
    license: 'http://creativecommons.org/publicdomain/zero/1.0/',
  },
};
