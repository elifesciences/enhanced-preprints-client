import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthorInformationList } from './author-information-list';
import { authors } from '../../../utils/mocks';

export default {
  title: 'Molecules/AuthorInformationList',
  component: AuthorInformationList,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'heading-order', enabled: false },
        ],
      },
    },
  },
} as ComponentMeta<typeof AuthorInformationList>;

const Template: ComponentStory<typeof AuthorInformationList> = (args) => (
  <AuthorInformationList {...args} />
);

export const Authors = Template.bind({});
Authors.args = {
  authors,
};
