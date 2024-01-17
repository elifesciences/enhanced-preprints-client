import { StoryFn } from '@storybook/react';
import { PageNotFound } from './page-not-found';
import { DefaultLayout } from '../../layouts/default';

export default {
  title: 'Pages/Page not found',
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'landmark-unique', enabled: false },
          { id: 'link-in-text-block', enabled: false },
        ],
      },
    },
  },
};

const Template: StoryFn<typeof PageNotFound> = () => <DefaultLayout><PageNotFound /></DefaultLayout>;

export const PageNotFoundPage = Template.bind({});
