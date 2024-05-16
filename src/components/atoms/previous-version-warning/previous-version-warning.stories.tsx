import { StoryFn, Meta } from '@storybook/react';

import { PreviousVersionWarning } from './previous-version-warning';

export default {
  title: 'Atoms/Previous Version Warning',
  component: PreviousVersionWarning,
} as Meta<typeof PreviousVersionWarning>;

const Template: StoryFn<typeof PreviousVersionWarning> = (args) => <PreviousVersionWarning {...args} />;

export const PreviousVersionWarningComponent = Template.bind({});
PreviousVersionWarningComponent.args = {
  url: 'www.google.com',
};
