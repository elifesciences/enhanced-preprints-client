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
        heading="Question:"
        title="What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?"
        summary="The paper investigates how responsibility for a partner's outcomes in risky choices evokes guilt and which brain regions are involved."
        attribution="Quoted text in Abstract:"
        quote="The neural mechanisms underlying guilt evoked during such situations of social responsibility are still unknown."
        claims={mockClaimsTreeData[0].claims}
      >
      </ClaimsTreeQuestionPage>
    </BlankLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreeQuestionPage>;

export const ClaimsTreeQuestion: Story = {};
