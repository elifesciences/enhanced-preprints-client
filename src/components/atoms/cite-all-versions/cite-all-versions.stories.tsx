import { Meta, StoryObj } from '@storybook/react';
import { CiteAllVersions } from './cite-all-versions';

const meta: Meta<typeof CiteAllVersions> = {
  title: 'Atoms/CiteAllVersions',
  component: CiteAllVersions,
};

export default meta;
type Story = StoryObj<typeof CiteAllVersions>;

export const CiteAllVersionsDefault: Story = {
  args: {
    doi: 'some.doi.12345',
  },
};
