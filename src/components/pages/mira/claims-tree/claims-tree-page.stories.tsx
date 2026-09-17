import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreePage } from './claims-tree-page';
import { mockClaimsTreeData } from '../../../../pages/test/mock-claims-tree-data';
import { BlankLayout } from '../../../layouts/blank';

const meta: Meta<typeof ClaimsTreePage> = {
  title: 'Pages/Claims Tree',
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
    <BlankLayout>
      <ClaimsTreePage
        questions={mockClaimsTreeData}
      >
      </ClaimsTreePage>
    </BlankLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreePage>;

export const ClaimsTree: Story = {};
