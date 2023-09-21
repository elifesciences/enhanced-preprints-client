import { StoryFn, Meta } from '@storybook/react';

import { Copyright } from './copyright';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Atoms/Copyright',
  component: Copyright,
} as Meta<typeof Copyright>;

const Template: StoryFn<typeof Copyright> = (args) => <Copyright {...args} />;

export const CopyrightLicense = Template.bind({});
CopyrightLicense.args = {
  license: 'http://creativecommons.org/licenses/by/4.0/',
  year: 2022,
  author: authors[0],
};

export const CopyrightPublic = Template.bind({});
CopyrightPublic.args = {
  license: 'http://creativecommons.org/publicdomain/zero/1.0/',
};
