import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ErrorMessages } from './error-messages';

export default {
  title: 'Atoms/ErrorMessages',
  component: ErrorMessages,
} as ComponentMeta<typeof ErrorMessages>;

const Template: ComponentStory<typeof ErrorMessages> = () => <ErrorMessages/>;

export const DefaultError = Template.bind({});
DefaultError.args = {
  Error: 'Sorry no reviews',
};
