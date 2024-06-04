import { StoryFn, Meta } from '@storybook/react';
import { VersionHistory } from './version-history';

export default {
  title: 'Atoms/VersionHistory',
  component: VersionHistory,
} as Meta<typeof VersionHistory>;

const Template: StoryFn<typeof VersionHistory> = () => <VersionHistory />;

export const VersionHistoryDefault = Template.bind({});
