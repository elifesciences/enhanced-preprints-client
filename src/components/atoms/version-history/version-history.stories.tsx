import { Meta, StoryObj } from '@storybook/react';
import { VersionHistory } from './version-history';
import { versionHistory } from '../../../utils/mocks';

const meta: Meta<typeof VersionHistory> = {
  title: 'Atoms/VersionHistory',
  component: VersionHistory,
};

export default meta;
type Story = StoryObj<typeof VersionHistory>;

export const VersionHistoryDefault: Story = {
  args: { versions: versionHistory },
};
