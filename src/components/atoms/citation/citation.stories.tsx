import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Citation } from './citation';
import { citation } from '../../../utils/mocks';

export default {
  title: 'Atoms/Citation',
  component: Citation,
} as ComponentMeta<typeof Citation>;

const Template: ComponentStory<typeof Citation> = (args) => (
  <Citation {...args} />
);

export const CitationStory = Template.bind({});
CitationStory.args = {
  citation,
};
