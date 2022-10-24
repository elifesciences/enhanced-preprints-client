import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReferenceList } from './reference-list';
import { references } from '../../../utils/mocks';

export default {
  title: 'Atoms/Reference List',
  component: ReferenceList,
} as ComponentMeta<typeof ReferenceList>;

const Template: ComponentStory<typeof ReferenceList> = (args) => (
  <ReferenceList {...args} />
);

export const ReferenceStory = Template.bind({});
ReferenceStory.args = {
  references,
};
