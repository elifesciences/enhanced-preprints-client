import figure3 from '../../../../../public/mira/figure-3.jpg';
import figure4 from '../../../../../public/mira/figure-4.jpg';
import figure5 from '../../../../../public/mira/figure-5.jpg';

// ts-unused-exports:disable-next-line
export const mockClaims = [
  {
    id: '1',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'The guilt effect is associated with increased BOLD signal in the left anterior insula.',
      summary: 'Left anterior insula activation is higher for low partner outcomes after participant choices versus partner choices.',
      attribution: 'Quoted text in Results:',
      quote: 'Thus, activation in our insula ROIs increased in situations during which participants experienced guilt for low outcomes impacting their partner, compared to similar outcomes resulting from the partner’s choices.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'Left anterior insula shows higher activation for low partner outcomes after participant choices vs partner choices (peak T = 3.95, d = 0.59, 22 voxels, MNI [−28 24 −4], FWE-corrected p = 0.024 within left anterior insula).',
      summary: 'Mass-univariate fMRI result confirming insula involvement in guilt effect.',
      attribution: 'Quoted text in Results:',
      quote: 'We found a weak response in a small cluster within the left anterior insula (peak T = 3.95, d = 0.59, 22 voxels, peak intensity at [−28 24 −4]; Figure 4F). This correction resulted in a p value of 0.024.',
    },
    relatedStudies: [
      {
        id: '2',
        name: 'Study 2',
        title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
        summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
      },
    ],
    relatedFigures: [
      {
        name: 'Figure 4',
        image: figure4,
        title: 'BOLD responses.',
        // eslint-disable-next-line @stylistic/max-len
        summary: 'Regions active during risky choices (A), social decision-making (B), with TPJ and precuneus most active during participant\'s risky social choices (C). Anterior insula responded to low partner outcomes from participant choices (D–F). Ventral striatum tracked participant rewards (G), while left STS tracked partner prediction errors from participant decisions (H–I).',
      },
    ],
  },
  {
    id: '2',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'Functional connectivity between the left anterior insula and the right inferior frontal gyrus varies with choice and condition, suggesting the right IFG is sensitive to guilt-related information during social choices.',
      summary: 'PPI analysis shows insula–right IFG connectivity strongest when participants make risky choices for themselves and safe choices for both.',
      attribution: 'Quoted text in Results:',
      quote: 'Connectivity between this region and the right inferior frontal gyrus varied depending on choice and experimental condition, suggesting that this part of prefrontal cortex is sensitive to guilt-related information during social choices.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'Right IFG connectivity with left insula is highest for risky choices in Solo and safe choices in Social (pFWE = 0.020, T = 4.34, d = 0.80, 115 voxels, MNI [46 16 22]).',
      summary: 'PPI analysis shows condition- and choice-dependent insula–IFG connectivity.',
      attribution: 'Quoted text in Results:',
      // eslint-disable-next-line @stylistic/max-len
      quote: 'The first analysis revealed a cluster in the right IFG whose connectivity to the insula (the seed region) was highest when participants made Risky choices for themselves and Safe choices for both players (pFWE = 0.020, T = 4.34, d = 0.80, Z = 4.21, 115 vox',
    },
    relatedStudies: [
      {
        id: '2',
        name: 'Study 2',
        title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
        summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
      },
    ],
    relatedFigures: [
      {
        name: 'Figure 5',
        image: figure5,
        title: 'Functional connectivity changes.',
        // eslint-disable-next-line @stylistic/max-len
        summary: 'Connectivity between the left anterior insula (seed) and a cluster in the right inferior frontal gyrus varied based on condition and choice type, being highest during risky solo choices and safe social choices. This suggests information flow about guilt-related processing during social decision-making.',
      },
    ],
  },
  {
    id: '3',
    questionNumber: '1',
    claim: {
      heading: 'Claim:',
      title: 'The left superior temporal sulcus tracks partner reward prediction errors specifically when they result from the participant\'s choices.',
      summary: 'Model-based fMRI reveals a left STS cluster responding more to partner RPEs following participant choices than partner choices.',
      attribution: 'Quoted text in Results:',
      quote: 'A model-based analysis revealed a left superior temporal sulcus cluster that tracked partner reward prediction errors that followed participant choices.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'Left STS cluster responds more to partner RPEs from participant choices than partner choices (pFWE = 0.022, T = 4.70, d = 0.53, 100 voxels, MNI [−52 –32 0]).',
      summary: 'Model-based fMRI identifies left STS tracking partner prediction errors contingent on agency.',
      attribution: 'Quoted text in Results:',
      quote: 'We found this effect in one cluster within the left STS (pFWE = 0.022, T = 4.70, d = 0.53, Z = 4.57, 100 voxels, peak at MNI [−52 –32 0]; Figure 4H).',
    },
    relatedStudies: [
      {
        id: '2',
        name: 'Study 2',
        title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
        summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
      },
    ],
    relatedFigures: [
      {
        name: 'Figure 3',
        image: figure3,
        title: 'Participant momentary happiness in Studies 1 and 2.',
        // eslint-disable-next-line @stylistic/max-len
        summary: 'Happiness correlated with rewards for both participant (A, E) and partner (B, F). The Responsibility Redux computational model predicted happiness variations well (C, G). Critically, changes in momentary happiness after lottery choices in Social and Partner conditions varied with lottery outcome and decision-maker, with lower outcomes decreasing happiness more when participants chose (D, H).',
      },
    ],
  },
  {
    id: '4',
    questionNumber: '2',
    claim: {
      heading: 'Claim:',
      title: 'Responsibility for a partner\'s bad lottery outcomes decreases participant happiness more than the same outcomes following partner choices, consistent with interpersonal guilt.',
      summary: 'The guilt effect: happiness drops more when the participant chose the lottery that gave the partner a low outcome, compared to when the partner chose it.',
      attribution: 'Quoted text in Results:',
      quote: 'When the partner received the low lottery outcome, participant happiness was lower when they rather than the partner had chosen the lottery, which we interpret as interpersonal guilt.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'In Study 1, happiness after low partner outcomes was lower when the participant chose the lottery (t(39) = –3.58, p < 0.001, d = 0.56, BF10 = 32).',
      summary: 'Behavioral guilt effect in the behavioral-only study.',
      attribution: 'Quoted text in Results:',
      quote: 'When the partner received the low lottery outcome, participant happiness was lower when they rather than the partner had chosen the lottery (Study 1: t(39) = –3.58, p < 0.001, d = 0.56, BF10 = 32).',
    },
    relatedStudies: [
      {
        id: '1',
        name: 'Study 1',
        title: 'Study 1: Behavioral experiment (N = 40) with risky choice task, happiness ratings, and computational modeling.',
        summary: 'Participants performed three sessions outside the scanner; partner was another participant.',
      },
      {
        id: '2',
        name: 'Study 2',
        title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
        summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
      },
    ],
  },
  {
    id: '5',
    questionNumber: '2',
    claim: {
      heading: 'Claim:',
      title: 'Computational models incorporating partner reward prediction errors differentiated by decision-maker (participant vs partner) best explain momentary happiness variations.',
      summary: 'The Responsibility model (with separate regressors for partner RPEs from participant and partner choices) outperforms Basic, Inequality, and Guilt-envy models.',
      attribution: 'Quoted text in Results:',
      quote: 'Overall, the Responsibility and Responsibility Redux models explained the data best (highest R2/adjusted R2 or lowest AIC/BIC); a likelihood ratio test revealed that the Responsibility model fitted better than all the other models.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'In Study 1, the Responsibility model fitted happiness data better than all other models (all LR ≥ 47.36, p < 0.0001).',
      summary: 'Computational model comparison in Study 1.',
      attribution: 'Quoted text in Results:',
      quote: 'The Responsibility model fitted better than all the other models (Study 1: all LR ≥47.36, p < 0.0001).',
    },
    relatedStudies: [
      {
        id: '1',
        name: 'Study 1',
        title: 'Study 1: Behavioral experiment (N = 40) with risky choice task, happiness ratings, and computational modeling.',
        summary: 'Participants performed three sessions outside the scanner; partner was another participant.',
      },
      {
        id: '2',
        name: 'Study 2',
        title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
        summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
      },
    ],
  },
  {
    id: '6',
    questionNumber: '3',
    claim: {
      heading: 'Claim:',
      title: 'Participants show similar risk preferences when deciding for themselves versus for themselves and a partner, with a tendency toward higher risk aversion in the Social condition only in Study 1.',
      summary: 'Risk premiums do not differ; CARA ρ shows slightly higher risk aversion in Social condition in Study 1 but not Study 2.',
      attribution: 'Quoted text in Results:',
      quote: 'Overall, we believe that we do not have strong evidence of differences in risk preferences across conditions.',
    },
    evidence: {
      heading: 'Evidence:',
      title: 'Risk premiums did not differ between Social and Solo conditions in Study 1 (t(39) = 1.53, p = 0.134, d = 0.24, BF10 = 0.49); CARA ρ slightly higher in Social (t(39) = 2.27, p = 0.03, d = 0.36).',
      summary: 'Risk preference measures in Study 1.',
      attribution: 'Quoted text in Results:',
      quote: 'Risk premiums did not differ between Social and Solo conditions (Study 1: Figure 2B, t(39) = 1.53, p = 0.134, Cohen’s d = 0.24, BF10 = 0.49).',
    },
    relatedStudies: [
      {
        id: '1',
        name: 'Study 1',
        title: 'Study 1: Behavioral experiment (N = 40) with risky choice task, happiness ratings, and computational modeling.',
        summary: 'Participants performed three sessions outside the scanner; partner was another participant.',
      },
      {
        id: '2',
        name: 'Study 2',
        title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
        summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
      },
    ],
  },
];
