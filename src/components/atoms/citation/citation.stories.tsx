import { StoryFn, Meta } from '@storybook/react';
import { Citation } from './citation';
import { citation } from '../../../utils/mocks';

export default {
  title: 'Atoms/Citation',
  component: Citation,
} as Meta<typeof Citation>;

const Template: StoryFn<typeof Citation> = (args) => (
  <Citation {...args} />
);

export const CitationStory = Template.bind({});
CitationStory.args = {
  citation,
};
