import { type Meta, type StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Institutions } from './institutions';

const meta: Meta<typeof Institutions> = {
  title: 'Atoms/Institutions',
  component: Institutions,
};

export default meta;
type Story = StoryObj<typeof Institutions>;

export const InstitutionList: Story = {
  args: {
    institutions: [
      { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
      { name: 'Star Labs', address: { addressCountry: 'Star City' } },
      { name: 'Avengers Tower', address: { addressCountry: 'New York' } },
      { name: 'Bat Cave', address: { addressCountry: 'Gotham' } },
      { name: 'Arrow Cave', address: { addressCountry: 'Central City' } },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('show', { exact: false });

    const initialInstitutions = Array.from(document.querySelectorAll('.institutions-list li')).filter((node) => node.checkVisibility());
    expect(initialInstitutions).toHaveLength(3);

    await userEvent.click(canvas.getByText('show', { exact: false }));

    const expandedInstitutions = Array.from(document.querySelectorAll('.institutions-list li')).filter((node) => node.checkVisibility());
    expect(expandedInstitutions).toHaveLength(5);

    await userEvent.click(canvas.getByText('show', { exact: false }));

    const collapsedInstitutions = Array.from(document.querySelectorAll('.institutions-list li')).filter((node) => node.checkVisibility());
    expect(collapsedInstitutions).toHaveLength(3);
  },
};
