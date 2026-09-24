import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeClaimPage } from './claims-tree-claim-page';
import { BlankLayout } from '../../../layouts/blank';

const meta: Meta<typeof ClaimsTreeClaimPage> = {
  title: 'Pages/Claims Tree Claim',
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
      <ClaimsTreeClaimPage
        claim={{
          heading: 'Claim:',
          title: 'The guilt effect is associated with increased BOLD signal in the left anterior insula.',
          summary: 'Responsibility for a partner\'s bad outcomes increased activity in brain regions associated with guilt processing.',
          attribution: 'Quoted text in Results:',
          quote: 'Responsibility for the partner\'s bad outcomes was associated with increased activity in the left anterior insula.',
        }}
        evidence={{
          heading: 'Evidence:',
          title: 'fMRI analysis of BOLD signal in the anterior insula during risky choices made for a partner.',
          summary: 'A general linear model contrasting responsibility and no-responsibility trials revealed increased BOLD signal in the left anterior insula.',
          attribution: 'Quoted text in Methods:',
          quote: 'BOLD signal was analyzed using a general linear model with responsibility as the primary contrast of interest.',
        }}
      >
      </ClaimsTreeClaimPage>
    </BlankLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreeClaimPage>;

export const ClaimsTreeClaim: Story = {};
