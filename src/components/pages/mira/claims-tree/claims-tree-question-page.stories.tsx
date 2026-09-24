import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeQuestionPage } from './claims-tree-question-page';
import { mockClaimsTreeData } from '../../../../pages/mira/mock-claims-tree-data';
import { BlankLayout } from '../../../layouts/blank';

const meta: Meta<typeof ClaimsTreeQuestionPage> = {
  title: 'Pages/Claims Tree Question',
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
      <ClaimsTreeQuestionPage
        claims={mockClaimsTreeData[0].claims}
      >
      </ClaimsTreeQuestionPage>
    </BlankLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreeQuestionPage>;

export const ClaimsTreeQuestion: Story = {};
