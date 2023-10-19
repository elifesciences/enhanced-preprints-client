import { StoryFn, Meta } from '@storybook/react';

import { Copyright } from './copyright';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Atoms/Copyright',
  component: Copyright,
} as Meta<typeof Copyright>;

const Template: StoryFn<typeof Copyright> = (args) => <Copyright {...args} />;

export const CopyrightLicenseWithMoreThanTwoAuthors = Template.bind({});
CopyrightLicenseWithMoreThanTwoAuthors.args = {
  license: 'http://creativecommons.org/licenses/by/4.0/',
  publishedYear: 2022,
  authors,
};

export const CopyrightLicenseWithTwoAuthors = Template.bind({});
CopyrightLicenseWithTwoAuthors.args = {
  license: 'http://creativecommons.org/licenses/by/4.0/',
  publishedYear: 2022,
  authors: [authors[0], authors[1]],
};

export const CopyrightLicenseWithOneAuthor = Template.bind({});
CopyrightLicenseWithOneAuthor.args = {
  license: 'http://creativecommons.org/licenses/by/4.0/',
  publishedYear: 2022,
  authors: [authors[0]],
};

export const CopyrightPublic = Template.bind({});
CopyrightPublic.args = {
  license: 'http://creativecommons.org/publicdomain/zero/1.0/',
};
