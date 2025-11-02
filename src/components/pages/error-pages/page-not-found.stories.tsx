import { type Meta, type StoryObj } from '@storybook/react';
import { PageNotFound } from './page-not-found';
import { DefaultLayout } from '../../layouts/default';

const meta: Meta<typeof PageNotFound> = {
  title: 'Pages/Page not found',
  parameters: {
    chromatic: {
      modes: {
        small: {
          viewport: 'small',
        },
        medium: {
          viewport: 'medium',
        },
        large: {
          viewport: 'large',
        },
        extraLarge: {
          viewport: 'extraLarge',
        },
      },
    },
  },
  render: () => (
    <DefaultLayout>
      <PageNotFound />
    </DefaultLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof PageNotFound>;

export const PageNotFoundPage: Story = {};
