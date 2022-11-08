import { ComponentStory } from '@storybook/react';
import { PageNotFound } from './page-not-found';

export default {
  title: 'Pages/Page not found',
};

const Template: ComponentStory<typeof PageNotFound> = () => <PageNotFound />;

export const PageNotFoundPage = Template.bind({});
