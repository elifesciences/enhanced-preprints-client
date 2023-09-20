import { StoryFn, Meta } from '@storybook/react';

import { Copyright } from './copyright';

export default {
  title: 'Atoms/Copyright',
  component: Copyright,
} as Meta<typeof Copyright>;

const Template: StoryFn<typeof Copyright> = (args) => <Copyright {...args} />;

export const CopyrightBy = Template.bind({});
CopyrightBy.args = {
  license: 'http://creativecommons.org/licenses/by/4.0/',
};

export const CopyrightZero = Template.bind({});
CopyrightZero.args = {
  license: 'http://creativecommons.org/licenses/zero/1.0/',
};
