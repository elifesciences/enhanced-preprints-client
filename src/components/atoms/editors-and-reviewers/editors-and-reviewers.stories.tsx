import { Meta, StoryObj } from '@storybook/react';
import '../../../i18n';

import { EditorsAndReviewers } from './editors-and-reviewers';

const meta: Meta<typeof EditorsAndReviewers> = {
  title: 'Atoms/Editors And Reviewers',
  component: EditorsAndReviewers,
};

export default meta;
type Story = StoryObj<typeof EditorsAndReviewers>;

export const EditorsAndReviewersExample: Story = {
  args: {
    participants: [
      { name: 'Steve Rogers', role: 'Reviewing Editor', institution: 'The Strategic Homeland Intervention, Enforcement, and Logistics Division, Washington, D.C., United States' },
      { name: 'Antony Stark', role: 'Senior Editor', institution: 'Stark Industries, Los Angeles, California, United States' },
    ],
  },
};
