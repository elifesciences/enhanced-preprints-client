import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeClaimPage } from './claims-tree-claim-page';
import figure4 from '../../../../../../public/mira/figure-4.jpg';
import { ClaimsTreeLayout } from '../../../../layouts/mira/claims-tree';

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
  args: {
    id: '1',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'The guilt effect is associated with increased BOLD signal in the left anterior insula.',
      summary: 'Responsibility for a partner\'s bad outcomes increased activity in brain regions associated with guilt processing.',
      attribution: 'Quoted text in Results:',
      quote: 'Responsibility for the partner\'s bad outcomes was associated with increased activity in the left anterior insula.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'fMRI analysis of BOLD signal in the anterior insula during risky choices made for a partner.',
      summary: 'A general linear model contrasting responsibility and no-responsibility trials revealed increased BOLD signal in the left anterior insula.',
      attribution: 'Quoted text in Methods:',
      quote: 'BOLD signal was analyzed using a general linear model with responsibility as the primary contrast of interest.',
    },
    relatedStudy: {
      name: 'Study 2',
      title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
      summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
    },
  },
  render: (args) => (
    <ClaimsTreeLayout>
      <ClaimsTreeClaimPage {...args} />
    </ClaimsTreeLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreeClaimPage>;

export const ClaimsTreeClaim: Story = {
  args: {
    relatedFigure: {
      name: 'Figure 4',
      image: figure4,
      title: 'BOLD responses.',
      // eslint-disable-next-line @stylistic/max-len
      summary: 'Regions active during risky choices (A), social decision-making (B), with TPJ and precuneus most active during participant\'s risky social choices (C). Anterior insula responded to low partner outcomes from participant choices (D–F). Ventral striatum tracked participant rewards (G), while left STS tracked partner prediction errors from participant decisions (H–I).',
    },
  },
};

export const ClaimsTreeClaimWithoutRelatedFigure: Story = {};
