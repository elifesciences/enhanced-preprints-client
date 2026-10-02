import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreePage } from './claims-tree-page';
import { mockClaimsTreeData, mockClaimsTreeStudies } from '../../../../../pages/mira/data/mocks/mock-claims-tree-data';
import { ClaimsTreeLayout } from '../../../../layouts/mira/claims-tree';

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
    <ClaimsTreeLayout>
      <ClaimsTreePage
        questions={mockClaimsTreeData}
        studies={mockClaimsTreeStudies}
      >
      </ClaimsTreePage>
    </ClaimsTreeLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreePage>;

export const ClaimsTree: Story = {};
