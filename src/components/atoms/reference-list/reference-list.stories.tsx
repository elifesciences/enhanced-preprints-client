import { Meta, StoryObj } from '@storybook/react';
import { ReferenceList } from './reference-list';
import { references } from '../../../utils/mocks';
import '../../../i18n';

const meta: Meta<typeof ReferenceList> = {
  title: 'Atoms/Reference List',
  component: ReferenceList,
};

export default meta;
type Story = StoryObj<typeof ReferenceList>;

export const ReferenceStory: Story = {
  args: {
    references,
  },
};
