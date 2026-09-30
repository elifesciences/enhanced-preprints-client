import Head from 'next/head';
import { type ReactNode } from 'react';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeStudyPage } from '../../components/pages/mira/claims-tree/study/claims-tree-study-page';

const studyData = {
  studyNumber: '2',
  study: {
    heading: 'Study:',
    title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
    summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
  },
  protocols: [
    {
      id: '1',
      heading: 'Protocol 1:',
      title: 'Risky choice task with three conditions (Solo, Social, Partner) where risky option is a lottery with independent outcomes for self and partner.',
      summary: 'Each trial presents a safe option and a lottery (50/50 high/low). In Social and Partner conditions, lottery played independently for both players. Safe option gives equal outcome to both.',
      attribution: 'Quoted text in Methods:',
      // eslint-disable-next-line @stylistic/max-len
      quote: 'participants repeatedly chose between safe and risky monetary outcomes in social contexts. Across conditions, each participant chose for both themselves and a partner (Social condition), or the partner chose for both themselves and the participant (Partner',
    },
    {
      id: '2',
      heading: 'Protocol 2:',
      title: 'Icebreaker game to establish positive social bond: blindfolded drawing with verbal instructions and positive feedback.',
      summary: '15-minute session where participant and partner take turns drawing half a picture while blindfolded, receiving encouragement.',
      attribution: 'Quoted text in Methods:',
      quote: 'participants played an ‘ice-breaker’ game that created a positive social bond between them, increasing the likelihood of feeling empathy and guilt for each other.',
    },
    {
      id: '3',
      heading: 'Protocol 3:',
      title: 'Momentary happiness ratings every two trials on a 100-point scale from ‘very unhappy’ to ‘very happy’.',
      summary: 'Ratings Z-scored per participant to normalize variability.',
      attribution: 'Quoted text in Methods:',
      quote: 'Every two trials, one ISI after the outcome of the previous trial, participants were asked ‘How happy are you right now?’.',
    },
    {
      id: '4',
      heading: 'Protocol 4:',
      title: 'Computational modeling of happiness with exponential decay: Basic, Inequality, Guilt-envy, Responsibility, and Responsibility Redux models.',
      summary: 'Models include certain rewards, expected value, self RPE, partner RPEs split by decision-maker, and inequality terms; fitted per participant.',
      attribution: 'Quoted text in Methods:',
      // eslint-disable-next-line @stylistic/max-len
      quote: 'we fitted computational models to each participant’s happiness data. In these models, certain rewards, the expected value of chosen lotteries, reward prediction errors and additional outcome parameters are modelled separately with influences that decay exp',
    },
    {
      id: '5',
      heading: 'Protocol 5:',
      title: 'Risk preference estimation via risk premium (logistic regression certainty equivalent) and CARA expected utility model (probit regression with Fechner noise).',
      summary: 'Risk premium: EVdiff at 50% risky choices. CARA: exponential utility U(x,ρ)=1−e^(−ρx), ρ estimated via nonlinear least squares.',
      attribution: 'Quoted text in Methods:',
      // eslint-disable-next-line @stylistic/max-len
      quote: 'we estimated risk attitudes by calculating a ‘risk premium’... Second, we used an expected utility theory (EUT) approach to calculate a parameter ρ that describes a decision-maker’s risk attitude under the assumption of constant absolute risk aversion.',
    },
    {
      id: '6',
      heading: 'Protocol 6:',
      title: 'fMRI acquisition on 3T Siemens TRIO: EPI BOLD, TR=2500ms, TE=30ms, 37 slices, 2×2×3mm voxels, flip angle 90°, FOV 192mm, PAT2.',
      summary: 'Structural T1-weighted image also acquired (TR=1660ms, TE=2540ms, 208 slices, 0.8mm isotropic).',
      attribution: 'Quoted text in Methods:',
      quote: 'Imaging data were collected on a 3T Siemens TRIO MRI system... with a repetition time (TR) of 2500 ms, an echo time (TE) of 30 ms, 37 slices with voxel sizes of 2 × 2 × 3 mm.',
    },
    {
      id: '7',
      heading: 'Protocol 7:',
      title: 'fMRI preprocessing in SPM12: discard first 5 volumes, realignment, coregistration, normalization to MNI305, resample to 2mm isotropic, smooth 8mm FWHM, high-pass filter 128s.',
      summary: 'Standard preprocessing pipeline.',
      attribution: 'Quoted text in Methods:',
      quote: 'Data were then pre-processed and analysed as in previous studies... using standard procedures in SPM12.',
    },
    {
      id: '8',
      heading: 'Protocol 8:',
      title: 'fMRI analysis: GLM1 (event-related), GLM2 (computational regressors), gPPI seed-to-voxel connectivity (left insula and left STS seeds), random-effects group models, LMMs on ROI parameter estimates.',
      summary: 'GLM1 includes choice, outcome, and condition regressors. GLM2 uses model-derived regressors (CR, EV, sRPE, social_pRPE, partner_pRPE). PPI uses gPPI toolbox.',
      attribution: 'Quoted text in Methods:',
      quote: 'We used the gPPI toolbox for SPM to run seed-to-voxel functional connectivity analyses.',
    },
  ],
};

const Page = () => (
  <>
    <Head>
      <title>{`Claims Tree Study ${studyData.studyNumber}`}</title>
    </Head>
    <ClaimsTreeStudyPage
      studyNumber={studyData.studyNumber}
      study={studyData.study}
      protocols={studyData.protocols}
    ></ClaimsTreeStudyPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <ClaimsTreeLayout>{page}</ClaimsTreeLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
