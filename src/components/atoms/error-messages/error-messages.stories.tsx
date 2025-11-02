import { type Meta, type StoryObj } from '@storybook/react';
import { ErrorMessages } from './error-messages';

const meta: Meta<typeof ErrorMessages> = {
  title: 'Atoms/ErrorMessages',
  component: ErrorMessages,
};

export default meta;
type Story = StoryObj<typeof ErrorMessages>;

export const DefaultError: Story = {};
