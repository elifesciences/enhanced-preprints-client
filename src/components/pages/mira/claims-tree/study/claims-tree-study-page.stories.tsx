import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeStudyPage } from './claims-tree-study-page';
import { BlankLayout } from '../../../../layouts/blank';

const meta: Meta<typeof ClaimsTreeStudyPage> = {
  title: 'Pages/Claims Tree Study',
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
      <ClaimsTreeStudyPage
        study={{
          heading: 'Study:',
          title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
          summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
        }}
        protocols={[
          {
            id: '1',
            heading: 'Protocol 1:',
            title: 'Icebreaker game to establish positive social bond: blindfolded drawing with verbal instructions and positive feedback.',
            summary: '15-minute session where participant and partner take turns drawing half a picture while blindfolded, receiving encouragement.',
            attribution: 'Quoted text in Methods:',
            quote: 'participants played an ‘ice-breaker’ game that created a positive social bond between them, increasing the likelihood of feeling empathy and guilt for each other.',
          },
          {
            id: '2',
            heading: 'Protocol 2:',
            title: 'Momentary happiness ratings every two trials on a 100-point scale from ‘very unhappy’ to ‘very happy’.',
            summary: 'Ratings Z-scored per participant to normalize variability.',
            attribution: 'Quoted text in Methods:',
            quote: 'Every two trials, one ISI after the outcome of the previous trial, participants were asked ‘How happy are you right now?’.',
          },
        ]}
      >
      </ClaimsTreeStudyPage>
    </BlankLayout>
  ),
};

export default meta;
type Story = StoryObj<typeof ClaimsTreeStudyPage>;

export const ClaimsTreeStudy: Story = {};
