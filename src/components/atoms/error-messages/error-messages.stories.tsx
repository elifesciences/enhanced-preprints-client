import { StoryFn, Meta } from '@storybook/react';
import { ErrorMessages } from './error-messages';

export default {
  title: 'Atoms/ErrorMessages',
  component: ErrorMessages,
} as Meta<typeof ErrorMessages>;

const Template: StoryFn<typeof ErrorMessages> = () => <ErrorMessages/>;

export const DefaultError = Template.bind({});
