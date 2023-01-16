import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';

export default {
  title: 'Atoms/Reference',
  component: Reference,
} as ComponentMeta<typeof Reference>;

const Template: ComponentStory<typeof Reference> = (args) => (
  <Reference {...args} />
);

export const ReferenceStory = Template.bind({});
ReferenceStory.args = {
  reference: references[0],
};
