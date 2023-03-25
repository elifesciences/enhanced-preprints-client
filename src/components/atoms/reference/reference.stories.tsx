import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';

export default {
  title: 'Atoms/Reference',
  component: Reference,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'listitem', enabled: false },
        ],
      },
    },
  },
} as ComponentMeta<typeof Reference>;

const Template: ComponentStory<typeof Reference> = (args) => (
  <Reference {...args} />
);

export const ReferenceStory = Template.bind({});
ReferenceStory.args = {
  reference: references[0],
};

export const ReferenceIsReferenceList = Template.bind({});
ReferenceIsReferenceList.args = {
  reference: references[0],
  isReferenceList: true,
};
