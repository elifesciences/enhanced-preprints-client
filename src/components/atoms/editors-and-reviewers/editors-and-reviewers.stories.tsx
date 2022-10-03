import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditorsAndReviewers } from './editors-and-reviewers';

export default {
  title: 'Atoms/Editors And Reviewers',
  component: EditorsAndReviewers,
} as ComponentMeta<typeof EditorsAndReviewers>;

const Template: ComponentStory<typeof EditorsAndReviewers> = (args) => <EditorsAndReviewers {...args} />;

export const EditorsAndReviewersExample = Template.bind({});
EditorsAndReviewersExample.args = {
  participants: [
    { name: 'Steve Rogers', role: 'Reviewing Editor', institution: 'The Strategic Homeland Intervention, Enforcement, and Logistics Division, Washington, D.C., United States' },
    { name: 'Antony Stark', role: 'Senior Editor', institution: 'Stark Industries, Los Angeles, California, United States' },
  ],
};
