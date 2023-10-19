import { StoryFn, Meta } from '@storybook/react';
import { ReferenceList } from './reference-list';
import { references } from '../../../utils/mocks';

export default {
  title: 'Atoms/Reference List',
  component: ReferenceList,
} as Meta<typeof ReferenceList>;

const Template: StoryFn<typeof ReferenceList> = (args) => (
  <ReferenceList {...args} />
);

export const ReferenceStory = Template.bind({});
ReferenceStory.args = {
  references,
};
