import { type Meta, type StoryObj } from '@storybook/nextjs';
import { RelatedStudy } from './related-study';

const meta: Meta<typeof RelatedStudy> = {
  title: 'Molecules/Mira/RelatedStudy',
  component: RelatedStudy,
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
};

export default meta;
type Story = StoryObj<typeof RelatedStudy>;

export const Default: Story = {
  args: {
    name: 'Study 2',
    title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
    summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
    studyPageHref: '#',
  },
};
