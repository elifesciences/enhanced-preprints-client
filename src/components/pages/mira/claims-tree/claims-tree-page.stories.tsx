import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreePage } from './claims-tree-page';
import { BlankLayout } from '../../../layouts/blank';

const question1HardcodedData = {text: 'What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?'};

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
        question1={question1HardcodedData}
      >
      </ClaimsTreePage>
    </BlankLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreePage>;

export const ClaimsTree: Story = {};
