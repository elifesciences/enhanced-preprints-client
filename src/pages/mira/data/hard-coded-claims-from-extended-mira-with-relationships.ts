/* eslint-disable @stylistic/max-len */
import { type StaticImageData } from 'next/image';

type Section = {
  heading: string,
  title: string,
  summary?: string,
  attribution?: string,
  quote?: string,
};

export type ClaimDataItem = {
  id: string,
  sourceId: string,
  questionId: string,
  questionNumber: string,
  derivedFrom?: string,
  claim: Section,
  evidence?: Array<Section & { id: string }>,
  relatedStudies?: Array<{
    id: string,
    name: string,
    title: string,
    summary: string,
  }>,
  relatedFigure?: {
    name: string,
    image: StaticImageData,
    title: string,
    summary: string,
  },
};

export const hardCodedClaimsFromExtendedMiraWithRelationships: Array<ClaimDataItem> = [
  {
    id: '1',
    sourceId: 'urn:uuid:85137f0a-ebf3-4512-8cb6-d6cb9eb6931e',
    questionId: 'urn:uuid:85137f0a-ebf3-4512-8cb6-d6cb9eb6931e#question',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'alt-agency-aversion-not-guilt',
      summary: 'The happiness cost observed in the Social condition is general agency aversion — the unpleasantness of being the decision-maker as such — and is not contingent on responsibility for a negative outcome befalling the partner.',
    },
    evidence: [
      {
        id: 'urn:uuid:618f55c1-0e97-43d1-bdb4-0d7f49784bfe',
        heading: 'Evidence:',
        title: 'Participant happiness was lower when the participant was the decision-maker (Social + Solo vs. Partner), independent of outcome (Study 1: t(3600) = –3.92, p < 0.0001, β = –0.14; Study 2: t(2870) = –6.07, p < 0.0001, β = –0.24).',
        summary: 'participant-happiness-lower-when-participant',
      },
    ],
  },
  {
    id: '2',
    sourceId: 'urn:uuid:f43ad09b-00ac-4442-820f-b0476e74d25a',
    questionId: 'urn:uuid:f43ad09b-00ac-4442-820f-b0476e74d25a#question',
    questionNumber: '2',
    claim: {
      heading: 'Claim:',
      title: 'alt-guilt-effect-driven-by-own-outcome',
      summary: 'The happiness decrease following negative partner outcomes under participant choice is driven by the participant\'s own lottery outcome rather than by the partner\'s, and so reflects self-directed disappointment rather than interpersonal guilt.',
    },
    evidence: [
      {
        id: 'urn:uuid:2460aa6c-428d-4d10-99b3-b8420af1f4b3',
        heading: 'Evidence:',
        title: 'The guilt effect occurred whether the participant received the high lottery outcome (Study 1: t(39) = –3.58, p < 0.001, d = 0.56; Study 2: t(43) = –2.68, p = 0.01, d = 0.4) or the low outcome (Study 1: t(39) = –3.39, p = 0.002, d = 0.54; Study 2: t(43) = –3.58, p < 0.001, d = 0.54).',
        summary: 'guilt-effect-occurred-whether-participant',
      },
    ],
  },
  {
    id: '3',
    sourceId: 'urn:uuid:d5ba8e97-1aab-40c4-9351-c441d83c5697',
    questionId: 'urn:uuid:d5ba8e97-1aab-40c4-9351-c441d83c5697#question',
    questionNumber: '3',
    claim: {
      heading: 'Claim:',
      title: 'alt-imaging-contrast-invalid',
      summary: 'The imaging pipeline and condition contrasts do not recover established effects, so differences reported between Social and Partner conditions cannot be attributed to the experimental manipulation.',
    },
    evidence: [
      {
        id: 'urn:uuid:7445f20a-5f02-41d4-8a13-8f9187650a56',
        heading: 'Evidence:',
        title: 'The bilateral ventral striatum was more active when participants chose the risky rather than the safe option (Cohen\'s d = 0.72 left, 0.85 right), irrespective of Social or Solo condition, replicating previous findings.',
        summary: 'bilateral-ventral-striatum-more-active',
      },
    ],
  },
  {
    id: '4',
    sourceId: 'urn:uuid:f5aef1bf-5c3a-43f7-8db7-8f6cac7a0964',
    questionId: 'urn:uuid:f5aef1bf-5c3a-43f7-8db7-8f6cac7a0964#question',
    questionNumber: '4',
    claim: {
      heading: 'Claim:',
      title: 'alt-model-based-glm-invalid',
      summary: 'The model-based fMRI approach does not recover known neural signals, so parametric modulators derived from the computational model — including the partner reward prediction error regressors — cannot be trusted.',
    },
    evidence: [
      {
        id: 'urn:uuid:36b87634-b160-49e8-8ab7-db31d9e21e3b',
        heading: 'Evidence:',
        title: 'As a manipulation check, bilateral ventral striatum activation increased with expected certain rewards and the expected values of chosen lotteries, explained by a model-based regressor coding participant rewards (left: pFWE = 0.002, T = 5.63, d = 0.75; right: pFWE = 0.005, T = 5.46, d = 0.70).',
        summary: 'manipulation-check-bilateral-ventral-striatum',
      },
    ],
  },
  {
    id: '5',
    sourceId: 'urn:uuid:1f6b6cc4-c9cf-4fe2-a7fa-a0bbad09aeda',
    questionId: 'urn:uuid:1f6b6cc4-c9cf-4fe2-a7fa-a0bbad09aeda#question',
    questionNumber: '5',
    claim: {
      heading: 'Claim:',
      title: 'alt-participants-insensitive-to-value',
      summary: 'Participants did not engage with the lottery task in a value-sensitive way — choices were inattentive or random — so the behavioural measures carry no information about preference or affect.',
    },
    evidence: [
      {
        id: 'urn:uuid:5f9e54ad-4455-4263-924f-c1f6337e4683',
        heading: 'Evidence:',
        title: 'Participants\' probability of choosing the risky option (lottery) increased with the difference between the expected value of the lottery and the value of the safe option (Study 1: t(4796) = 9.26, p < 3.1e–20, β = 0.074; Study 2: t(3829) = 10.62, p < 5.3e–26, β = 0.093).',
        summary: 'participants-probability-choosing-risky-option',
      },
    ],
  },
  {
    id: '6',
    sourceId: 'urn:uuid:51c61d6b-8aee-4a0b-b4fa-da89f129bb8f',
    questionId: 'urn:uuid:51c61d6b-8aee-4a0b-b4fa-da89f129bb8f#question',
    questionNumber: '6',
    claim: {
      heading: 'Claim:',
      title: 'alt-social-context-shifts-risk-attitude',
      summary: 'The happiness and choice differences between Social and Partner conditions reflect a social-context-driven shift in risk attitude — participants become more or less risk averse when choosing on another person\'s behalf — rather than responsibility-contingent interpersonal guilt.',
    },
    evidence: [
      {
        id: 'urn:uuid:1813072f-1d0c-4a54-9856-2b51986577e7',
        heading: 'Evidence:',
        title: 'Risk premiums did not differ between Solo and Social conditions in either study (Study 1: t(39) = 1.53, p = 0.134, d = 0.24, BF10 = 0.49; Study 2: t(43) = –0.21, p = 0.84, d = –0.03, BF10 = 0.17).',
        summary: 'risk-premiums-not-differ-between',
      },
    ],
  },
  {
    id: '7',
    sourceId: 'urn:uuid:04e5bc49-10f5-4beb-8c43-89b22c679b7e',
    questionId: 'urn:uuid:04e5bc49-10f5-4beb-8c43-89b22c679b7e#question',
    questionNumber: '7',
    claim: {
      heading: 'Claim:',
      title: 'anterior-insula-neural-substrate-guilt',
      summary: 'The anterior insula is the neural substrate of the guilt effect, increasing its BOLD response when participants are responsible for low outcomes affecting their partner.',
    },
    evidence: [
      {
        id: 'urn:uuid:81b14911-8bf5-4e9e-8394-1e2e8aca5614',
        heading: 'Evidence:',
        title: 'The insula ROIs responded more to low lottery outcomes for the partner in the Social than the Partner condition — even after subtracting responses to high outcomes — mirroring the behavioural guilt effect.',
        summary: 'insula-rois-responded-more-low',
      },
    ],
  },
  {
    id: '8',
    sourceId: 'urn:uuid:2eaffd4f-a6b3-49be-b8b5-4fbb48c18862',
    questionId: 'urn:uuid:04e5bc49-10f5-4beb-8c43-89b22c679b7e#question',
    questionNumber: '7',
    derivedFrom: 'urn:uuid:04e5bc49-10f5-4beb-8c43-89b22c679b7e',
    claim: {
      heading: 'Claim:',
      title: 'anterior-insula-tracks-guilt-insula',
      summary: 'If the anterior insula tracks guilt, then insula BOLD should be higher in the Social than the Partner condition and show a significant Social-by-low-outcome interaction.',
    },
    evidence: [
      {
        id: 'urn:uuid:81b14911-8bf5-4e9e-8394-1e2e8aca5614',
        heading: 'Evidence:',
        title: 'The insula ROIs responded more to low lottery outcomes for the partner in the Social than the Partner condition — even after subtracting responses to high outcomes — mirroring the behavioural guilt effect.',
        summary: 'insula-rois-responded-more-low',
      },
      {
        id: 'urn:uuid:d7be0749-efba-4197-8e60-439e3d9854c5',
        heading: 'Evidence:',
        title: 'A mass-univariate voxel-wise analysis found a small left anterior insula cluster (peak T = 3.95, d = 0.59, 22 voxels) responding more to low partner outcomes following participant than partner choices, which survived small-volume family-wise-error correction (p = 0.024).',
        summary: 'mass-univariate-voxel-wise-analysis-found-small',
      },
    ],
  },
  {
    id: '9',
    sourceId: 'urn:uuid:330234b6-a3f1-49eb-9dc5-ea3eb2e472d9',
    questionId: 'urn:uuid:d4345156-99c1-4a80-a83f-2d59f0eab0fa#question',
    questionNumber: '9',
    claim: {
      heading: 'Claim:',
      title: 'authors-suggest-left-sts-region',
      summary: 'The authors suggest this left STS region tracks a partner\'s unexpected outcomes less when they do not follow from the participant\'s decisions.',
    },
    evidence: [
      {
        id: 'urn:uuid:9cbbf7c9-119a-4902-8336-fff7fdd36fd6',
        heading: 'Evidence:',
        title: 'One cluster in the left STS responded more to partner reward prediction errors resulting from participant rather than partner choices (pFWE = 0.022, T = 4.70, d = 0.53, 100 voxels, peak MNI [−52 –32 0]).',
        summary: 'one-cluster-left-sts-responded',
      },
    ],
  },
  {
    id: '10',
    sourceId: 'urn:uuid:f5f6dea4-d923-46bc-b48c-0c9cf78edc89',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    claim: {
      heading: 'Claim:',
      title: 'behavioural-guilt-effect-larger-happiness',
      summary: 'The behavioural guilt effect (larger happiness decrease after low partner outcomes following participant rather than partner choices) is compatible with \'simple guilt\'.',
    },
    evidence: [
      {
        id: 'urn:uuid:f3a97a72-32b6-4f6d-ae59-61d8ac8f016a',
        heading: 'Evidence:',
        title: 'When the partner received the low lottery outcome, participant happiness was lower when the participant rather than the partner had chosen the lottery — a significant partner-outcome × decision-maker interaction (Study 1: t(1180) = 3.52, p = 0.0004, β = 0.37; Study 2: t(937) = 2.85, p = 0.0045, β = 0.33) — operationalizing interpersonal guilt.',
        summary: 'when-partner-received-low-lottery',
      },
    ],
  },
  {
    id: '11',
    sourceId: 'urn:uuid:9a335450-a36a-4c98-8791-2fb88471625e',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    claim: {
      heading: 'Claim:',
      title: 'both-studies-participants-felt-worse',
      summary: 'In both studies, participants felt worse after low lottery outcomes for the partner when those outcomes followed their own choice rather than the partner\'s, which the authors interpret as interpersonal guilt.',
    },
    evidence: [
      {
        id: 'urn:uuid:f3a97a72-32b6-4f6d-ae59-61d8ac8f016a',
        heading: 'Evidence:',
        title: 'When the partner received the low lottery outcome, participant happiness was lower when the participant rather than the partner had chosen the lottery — a significant partner-outcome × decision-maker interaction (Study 1: t(1180) = 3.52, p = 0.0004, β = 0.37; Study 2: t(937) = 2.85, p = 0.0045, β = 0.33) — operationalizing interpersonal guilt.',
        summary: 'when-partner-received-low-lottery',
      },
    ],
  },
  {
    id: '12',
    sourceId: 'urn:uuid:a64ed9c4-5517-4694-b9ba-b4293b6a4d07',
    questionId: 'urn:uuid:fa1da708-d303-40f0-bde6-1eeacbb2389c#question',
    questionNumber: '8',
    derivedFrom: 'urn:uuid:fa1da708-d303-40f0-bde6-1eeacbb2389c',
    claim: {
      heading: 'Claim:',
      title: 'connectivity-between-guilt-responsibility-related-outcome-ph',
      summary: 'If connectivity between the guilt- and responsibility-related outcome-phase regions (left insula, left STS) and prefrontal cortex depends on whether participants decide for themselves alone or also for their partner and on the type of choice, then a seed-to-voxel psychophysiological-interaction analysis seeded in these regions should reveal prefrontal clusters showing a significant Condition-by-Choice interaction.',
    },
    evidence: [
      {
        id: 'urn:uuid:87144263-e766-45b9-b933-6b626fc5ab85',
        heading: 'Evidence:',
        title: 'Functional connectivity between the left anterior insula (seed) and a cluster in the right inferior frontal gyrus varied with condition and choice, being highest when participants made Risky choices for themselves and Safe choices for both players (pFWE = 0.020, T = 4.34, d = 0.80, 115 voxels, peak MNI [46 16 22]).',
        summary: 'functional-connectivity-between-left-anterior',
      },
    ],
  },
  {
    id: '13',
    sourceId: 'urn:uuid:a9bd5d97-a634-413f-9d82-480d553ccf34',
    questionId: 'urn:uuid:fa1da708-d303-40f0-bde6-1eeacbb2389c#question',
    questionNumber: '8',
    claim: {
      heading: 'Claim:',
      title: 'connectivity-between-left-anterior-insula',
      summary: 'Connectivity between the left anterior insula and the right inferior frontal gyrus varied with choice and condition, suggesting this prefrontal region is sensitive to guilt-related information during social choices.',
    },
    evidence: [
      {
        id: 'urn:uuid:7565f776-0cbb-417d-b801-2a8e4d942c08',
        heading: 'Evidence:',
        title: 'A left IFG cluster showed the opposite pattern of connectivity with the left STS seed — highest for Safe-self / Risky-both-players choices — but did not survive correction for multiple comparisons (p uncorrected = 0.001, T = 4.44, 35 voxels, peak MNI [–48 14 6]).',
        summary: 'left-ifg-cluster-showed-opposite',
      },
      {
        id: 'urn:uuid:87144263-e766-45b9-b933-6b626fc5ab85',
        heading: 'Evidence:',
        title: 'Functional connectivity between the left anterior insula (seed) and a cluster in the right inferior frontal gyrus varied with condition and choice, being highest when participants made Risky choices for themselves and Safe choices for both players (pFWE = 0.020, T = 4.34, d = 0.80, 115 voxels, peak MNI [46 16 22]).',
        summary: 'functional-connectivity-between-left-anterior',
      },
    ],
  },
  {
    id: '14',
    sourceId: 'urn:uuid:8ddb6db0-7f1b-404d-ae2a-352a03ba13d3',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    claim: {
      heading: 'Claim:',
      title: 'each-trial-participants-chose-between',
      summary: 'On each trial participants chose between a safe and a risky monetary option under three conditions: choosing for oneself (Solo), for oneself and the partner (Social), and having the partner choose for both (Partner).',
    },
    evidence: [
      {
        id: 'urn:uuid:41fdf7cc-9f55-4060-96ea-53c175a9f272',
        heading: 'Evidence:',
        title: 'Decisions in the Social compared with the Solo condition engaged three clusters — the precuneus (d = 0.79), left temporo-parietal junction (d = 0.59), and medial prefrontal cortex (d = 0.54).',
        summary: 'decisions-social-compared-solo-condition',
      },
      {
        id: 'urn:uuid:f3a97a72-32b6-4f6d-ae59-61d8ac8f016a',
        heading: 'Evidence:',
        title: 'When the partner received the low lottery outcome, participant happiness was lower when the participant rather than the partner had chosen the lottery — a significant partner-outcome × decision-maker interaction (Study 1: t(1180) = 3.52, p = 0.0004, β = 0.37; Study 2: t(937) = 2.85, p = 0.0045, β = 0.33) — operationalizing interpersonal guilt.',
        summary: 'when-partner-received-low-lottery',
      },
      {
        id: 'urn:uuid:a4ff2cf1-0e20-4953-b866-139a23b050fe',
        heading: 'Evidence:',
        title: 'Participants chose the risky option (lottery) more often in the Solo than the Social condition in Study 1 (t(4796) = 2.54, p = 0.011, β = 0.164) but not in Study 2 (t(3829) = 0.23, p = 0.82, β = 0.015).',
        summary: 'participants-chose-risky-option-lottery',
      },
    ],
  },
  {
    id: '15',
    sourceId: 'urn:uuid:f8cd7c54-93a3-4b1e-aae2-9367ec966ee2',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    claim: {
      heading: 'Claim:',
      title: 'findings-rest-two-samples-healthy',
      summary: 'The findings rest on two samples of healthy adults — Study 1 (behaviour only, N = 40) and Study 2 (fMRI, N = 44); all BOLD/fMRI results derive from Study 2, while the behavioural results come from both studies.',
    },
    evidence: [
      {
        id: 'urn:uuid:f3a97a72-32b6-4f6d-ae59-61d8ac8f016a',
        heading: 'Evidence:',
        title: 'When the partner received the low lottery outcome, participant happiness was lower when the participant rather than the partner had chosen the lottery — a significant partner-outcome × decision-maker interaction (Study 1: t(1180) = 3.52, p = 0.0004, β = 0.37; Study 2: t(937) = 2.85, p = 0.0045, β = 0.33) — operationalizing interpersonal guilt.',
        summary: 'when-partner-received-low-lottery',
      },
    ],
  },
  {
    id: '16',
    sourceId: 'urn:uuid:fa1da708-d303-40f0-bde6-1eeacbb2389c',
    questionId: 'urn:uuid:fa1da708-d303-40f0-bde6-1eeacbb2389c#question',
    questionNumber: '8',
    claim: {
      heading: 'Claim:',
      title: 'functional-connectivity-between-guilt-responsibility-related',
      summary: 'Functional connectivity between guilt- and responsibility-related outcome-phase regions and prefrontal cortex changes depending on whether participants decide for themselves alone or also for their partner, and on the type of choice (Safe or Risky).',
    },
    evidence: [
      {
        id: 'urn:uuid:87144263-e766-45b9-b933-6b626fc5ab85',
        heading: 'Evidence:',
        title: 'Functional connectivity between the left anterior insula (seed) and a cluster in the right inferior frontal gyrus varied with condition and choice, being highest when participants made Risky choices for themselves and Safe choices for both players (pFWE = 0.020, T = 4.34, d = 0.80, 115 voxels, peak MNI [46 16 22]).',
        summary: 'functional-connectivity-between-left-anterior',
      },
    ],
  },
  {
    id: '17',
    sourceId: 'urn:uuid:85ab5c7e-54dc-4443-8535-3592e00b6626',
    questionId: 'urn:uuid:85137f0a-ebf3-4512-8cb6-d6cb9eb6931e#question',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'lower-happiness-when-participant-decision-maker',
      summary: 'The lower happiness when the participant is the decision-maker may reflect responsibility aversion — a cost of the \'weight of the responsibility\'.',
    },
    evidence: [
      {
        id: 'urn:uuid:618f55c1-0e97-43d1-bdb4-0d7f49784bfe',
        heading: 'Evidence:',
        title: 'Participant happiness was lower when the participant was the decision-maker (Social + Solo vs. Partner), independent of outcome (Study 1: t(3600) = –3.92, p < 0.0001, β = –0.14; Study 2: t(2870) = –6.07, p < 0.0001, β = –0.24).',
        summary: 'participant-happiness-lower-when-participant',
      },
    ],
  },
  {
    id: '18',
    sourceId: 'urn:uuid:a68091e1-3046-42a5-9318-f41d60a73c10',
    questionId: 'urn:uuid:d4345156-99c1-4a80-a83f-2d59f0eab0fa#question',
    questionNumber: '9',
    derivedFrom: 'urn:uuid:d4345156-99c1-4a80-a83f-2d59f0eab0fa',
    claim: {
      heading: 'Claim:',
      title: 'neural-substrate-tracks-participant-responsibility-2',
      summary: 'If a neural substrate tracks the participant\'s responsibility for the partner\'s outcomes, then within regions sensitive to the outcomes of risky choices, BOLD should respond more strongly to the partner\'s reward prediction errors resulting from the participant\'s own choices than from the partner\'s choices.',
    },
    evidence: [
      {
        id: 'urn:uuid:9cbbf7c9-119a-4902-8336-fff7fdd36fd6',
        heading: 'Evidence:',
        title: 'One cluster in the left STS responded more to partner reward prediction errors resulting from participant rather than partner choices (pFWE = 0.022, T = 4.70, d = 0.53, 100 voxels, peak MNI [−52 –32 0]).',
        summary: 'one-cluster-left-sts-responded',
      },
    ],
  },
  {
    id: '19',
    sourceId: 'urn:uuid:d4345156-99c1-4a80-a83f-2d59f0eab0fa',
    questionId: 'urn:uuid:d4345156-99c1-4a80-a83f-2d59f0eab0fa#question',
    questionNumber: '9',
    claim: {
      heading: 'Claim:',
      title: 'neural-substrate-tracks-participant-responsibility',
      summary: 'A neural substrate tracks the participant\'s responsibility for the partner\'s outcomes: within regions sensitive to choice outcomes, the partner\'s reward prediction errors are represented more strongly when they arise from the participant\'s own choice than from the partner\'s choice.',
    },
    evidence: [
      {
        id: 'urn:uuid:9cbbf7c9-119a-4902-8336-fff7fdd36fd6',
        heading: 'Evidence:',
        title: 'One cluster in the left STS responded more to partner reward prediction errors resulting from participant rather than partner choices (pFWE = 0.022, T = 4.70, d = 0.53, 100 voxels, peak MNI [−52 –32 0]).',
        summary: 'one-cluster-left-sts-responded',
      },
    ],
  },
  {
    id: '20',
    sourceId: 'urn:uuid:c3110968-1d8c-440f-8f0a-f895f7591a9e',
    questionId: 'urn:uuid:51c61d6b-8aee-4a0b-b4fa-da89f129bb8f#question',
    questionNumber: '6',
    claim: {
      heading: 'Claim:',
      title: 'participants-showed-very-similar-risk',
      summary: 'Participants showed very similar risk preferences whether deciding only for themselves (Solo) or for themselves and their partner (Social), with only a tendency toward higher risk aversion in the Social condition in Study 1.',
    },
    evidence: [
      {
        id: 'urn:uuid:1813072f-1d0c-4a54-9856-2b51986577e7',
        heading: 'Evidence:',
        title: 'Risk premiums did not differ between Solo and Social conditions in either study (Study 1: t(39) = 1.53, p = 0.134, d = 0.24, BF10 = 0.49; Study 2: t(43) = –0.21, p = 0.84, d = –0.03, BF10 = 0.17).',
        summary: 'risk-premiums-not-differ-between',
      },
      {
        id: 'urn:uuid:6f933576-d65d-429f-a8e7-45dab12c329d',
        heading: 'Evidence:',
        title: 'Participants were slightly more risk averse (higher ρ) in the Social than the Solo condition in Study 1 (t(39) = 2.27, p = 0.03, d = 0.36, BF10 = 1.69) but not in Study 2 (t(43) = 1.40, p = 0.17, d = 0.21, BF10 = 0.41).',
        summary: 'participants-slightly-more-risk-averse',
      },
      {
        id: 'urn:uuid:a3b19ef3-bb8e-4833-a58d-26cca005b3bd',
        heading: 'Evidence:',
        title: 'There was no significant interaction between the difference in expected values and experimental conditions in either study (p > 0.52).',
        summary: 'no-significant-interaction-between-difference',
      },
      {
        id: 'urn:uuid:a4ff2cf1-0e20-4953-b866-139a23b050fe',
        heading: 'Evidence:',
        title: 'Participants chose the risky option (lottery) more often in the Solo than the Social condition in Study 1 (t(4796) = 2.54, p = 0.011, β = 0.164) but not in Study 2 (t(3829) = 0.23, p = 0.82, β = 0.015).',
        summary: 'participants-chose-risky-option-lottery',
      },
    ],
  },
  {
    id: '21',
    sourceId: 'urn:uuid:6f88f48c-5191-4b6b-8bd1-4b68cf9a29e7',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    derivedFrom: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a',
    claim: {
      heading: 'Claim:',
      title: 'responsibility-outcomes-generates-guilt-participant',
      summary: 'If responsibility for outcomes generates guilt, then participant happiness should decrease more after low lottery outcomes for the partner when the participant rather than the partner chose the lottery.',
    },
    evidence: [
      {
        id: 'urn:uuid:f3a97a72-32b6-4f6d-ae59-61d8ac8f016a',
        heading: 'Evidence:',
        title: 'When the partner received the low lottery outcome, participant happiness was lower when the participant rather than the partner had chosen the lottery — a significant partner-outcome × decision-maker interaction (Study 1: t(1180) = 3.52, p = 0.0004, β = 0.37; Study 2: t(937) = 2.85, p = 0.0045, β = 0.33) — operationalizing interpersonal guilt.',
        summary: 'when-partner-received-low-lottery',
      },
    ],
  },
  {
    id: '22',
    sourceId: 'urn:uuid:67cf29ce-6fc2-4aa4-bb26-6b990f32019a',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    derivedFrom: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a',
    claim: {
      heading: 'Claim:',
      title: 'responsibility-partner-outcomes-influences-participant',
      summary: 'If responsibility for the partner\'s outcomes influences the participant\'s momentary happiness, then a computational model that includes the partner\'s reward prediction errors arising from the participant\'s own choices (social_pRPE) should explain the happiness data better than models omitting them, and social_pRPE weights should be reliably greater than zero.',
    },
    evidence: [
      {
        id: 'urn:uuid:361dbc69-143a-46fc-a84a-422381efb954',
        heading: 'Evidence:',
        title: 'A likelihood ratio test showed the Responsibility model fitted the happiness data better than all other models, including the Responsibility Redux model (Study 1: all LR ≥ 47.36, p < 0.0001; Study 2: all LR ≥ 77.83, p < 0.0001).',
        summary: 'likelihood-ratio-test-showed-responsibility',
      },
      {
        id: 'urn:uuid:e24a6bdd-0bf2-4f65-9012-581962ac4fcd',
        heading: 'Evidence:',
        title: 'The partner\'s reward prediction errors resulting from the participants\' own choices (social_pRPE) had weights greater than 0 (Responsibility model: Study 1: Z = 2.85, p = 0.004; Study 2: Z = 3.26, p = 0.001), contributing to explaining participants\' momentary happiness.',
        summary: 'partner-reward-prediction-errors-resulting',
      },
    ],
  },
  {
    id: '23',
    sourceId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a',
    questionId: 'urn:uuid:04bfb7fe-175b-44d3-b5bb-f690574d4f6a#question',
    questionNumber: '10',
    claim: {
      heading: 'Claim:',
      title: 'responsibility-social-choice-yields-low',
      summary: 'Responsibility for a social choice that yields a low outcome for a partner produces interpersonal guilt, experienced by the decision-maker as a larger decrease in momentary happiness than when the partner made the same choice.',
    },
    evidence: [
      {
        id: 'urn:uuid:361dbc69-143a-46fc-a84a-422381efb954',
        heading: 'Evidence:',
        title: 'A likelihood ratio test showed the Responsibility model fitted the happiness data better than all other models, including the Responsibility Redux model (Study 1: all LR ≥ 47.36, p < 0.0001; Study 2: all LR ≥ 77.83, p < 0.0001).',
        summary: 'likelihood-ratio-test-showed-responsibility',
      },
      {
        id: 'urn:uuid:e24a6bdd-0bf2-4f65-9012-581962ac4fcd',
        heading: 'Evidence:',
        title: 'The partner\'s reward prediction errors resulting from the participants\' own choices (social_pRPE) had weights greater than 0 (Responsibility model: Study 1: Z = 2.85, p = 0.004; Study 2: Z = 3.26, p = 0.001), contributing to explaining participants\' momentary happiness.',
        summary: 'partner-reward-prediction-errors-resulting',
      },
      {
        id: 'urn:uuid:f3a97a72-32b6-4f6d-ae59-61d8ac8f016a',
        heading: 'Evidence:',
        title: 'When the partner received the low lottery outcome, participant happiness was lower when the participant rather than the partner had chosen the lottery — a significant partner-outcome × decision-maker interaction (Study 1: t(1180) = 3.52, p = 0.0004, β = 0.37; Study 2: t(937) = 2.85, p = 0.0045, β = 0.33) — operationalizing interpersonal guilt.',
        summary: 'when-partner-received-low-lottery',
      },
    ],
  },
  {
    id: '24',
    sourceId: 'urn:uuid:67abbc49-5bf2-4491-bb3c-d00cd9c94a84',
    questionId: 'urn:uuid:04e5bc49-10f5-4beb-8c43-89b22c679b7e#question',
    questionNumber: '7',
    claim: {
      heading: 'Claim:',
      title: 'study-reproduced-study-design-inside',
      summary: 'Study 2 reproduced the Study 1 design inside the fMRI scanner with identical parameters except for longer inter-stimulus intervals (3–11 s) and partners who were experimenters positioned outside the scanner.',
    },
    evidence: [
      {
        id: 'urn:uuid:81b14911-8bf5-4e9e-8394-1e2e8aca5614',
        heading: 'Evidence:',
        title: 'The insula ROIs responded more to low lottery outcomes for the partner in the Social than the Partner condition — even after subtracting responses to high outcomes — mirroring the behavioural guilt effect.',
        summary: 'insula-rois-responded-more-low',
      },
    ],
  },
];
