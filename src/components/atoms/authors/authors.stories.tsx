import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Authors } from './authors';
import { authors } from '../../../utils/mocks';

const meta: Meta<typeof Authors> = {
  title: 'Atoms/Authors',
  component: Authors,
};

export default meta;
type Story = StoryObj<typeof Authors>;

export const AuthorList: Story = {
  args: {
    authors,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('show', { exact: false });

    const initialAuthors = Array.from(document.querySelectorAll('.authors-list li')).filter((node) => node.checkVisibility());
    await expect(initialAuthors).toHaveLength(10);

    await userEvent.click(canvas.getByText('show', { exact: false }));

    const expandedAuthors = Array.from(document.querySelectorAll('.authors-list li')).filter((node) => node.checkVisibility());
    await expect(expandedAuthors).toHaveLength(15);

    await userEvent.click(canvas.getByText('show', { exact: false }));

    const collapsedAuthors = Array.from(document.querySelectorAll('.authors-list li')).filter((node) => node.checkVisibility());
    await expect(collapsedAuthors).toHaveLength(10);
  },
};
