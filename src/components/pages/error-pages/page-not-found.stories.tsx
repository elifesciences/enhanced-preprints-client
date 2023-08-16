import { StoryFn } from '@storybook/react';
import { PageNotFound } from './page-not-found';
import { DefaultLayout } from '../../layouts/default';

export default {
  title: 'Pages/Page not found',
};

const Template: StoryFn<typeof PageNotFound> = () => <DefaultLayout><PageNotFound /></DefaultLayout>;

export const PageNotFoundPage = Template.bind({});
