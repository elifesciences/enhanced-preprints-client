import { StoryFn, Meta } from '@storybook/react';
import { VersionHistory } from './version-history';
import { versionHistory } from '../../../utils/mocks';

export default {
  title: 'Atoms/VersionHistory',
  component: VersionHistory,
} as Meta<typeof VersionHistory>;

const Template: StoryFn<typeof VersionHistory> = () => <VersionHistory versions={versionHistory}/>;

export const VersionHistoryDefault = Template.bind({});
