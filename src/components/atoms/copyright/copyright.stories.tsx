import { StoryFn, Meta } from '@storybook/react';

import { Copyright } from './copyright';

export default {
  title: 'Atoms/Copyright',
  component: Copyright,
} as Meta<typeof Copyright>;

const Template: StoryFn<typeof Copyright> = (args) => <Copyright {...args} />;

export const CopyrightMeta = Template.bind({});
CopyrightMeta.args = {
  license: 'http://creativecommons.org/licenses/by/4.0/',
};