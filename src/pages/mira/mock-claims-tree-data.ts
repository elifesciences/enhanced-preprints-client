export const mockClaimsTreeData = [{
  questionNumber: '1',
  text: 'What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?',
  claims: [
    {
      id: '1',
      questionNumber: '1',
      title: 'The guilt effect is associated with increased BOLD signal in the left anterior insula.',
      related: ['Figure', 'Study 2'],
    },
    {
      id: '2',
      questionNumber: '1',
      title: 'Functional connectivity between the left anterior insula and the right inferior frontal gyrus varies with choice and condition, suggesting the right IFG is sensitive to guilt-related information during social choices.',
      related: ['Figure', 'Study 2'],
    },
    {
      id: '3',
      questionNumber: '1',
      title: 'The left superior temporal sulcus tracks partner reward prediction errors specifically when they result from the participant\'s choices.',
      related: ['Figure', 'Study 2'],
    },
  ],
},
{
  questionNumber: '2',
  text: 'How does responsibility for a partner\'s outcomes influence momentary happiness and its neural correlates?',
  claims: [
    {
      id: '4',
      questionNumber: '2',
      title: 'Responsibility for a partner\'s bad lottery outcomes decreases participant happiness more than the same outcomes following partner choices, consistent with interpersonal guilt.',
      related: ['Data', 'Study 1 & 2'],
    },
    {
      id: '5',
      questionNumber: '2',
      title: 'Computational models incorporating partner reward prediction errors differentiated by decision-maker (participant vs partner) best explain momentary happiness variations.',
      related: ['Data', 'Study 1 & 2'],
    },
  ],
},
{
  questionNumber: '3',
  text: 'Do risk preferences differ between Solo and Social conditions?',
  claims: [
    {
      id: '6',
      questionNumber: '3',
      title: 'Participants show similar risk preferences when deciding for themselves versus for themselves and a partner, with a tendency toward higher risk aversion in the Social condition only in Study 1.',
      related: ['Data', 'Study 1 & 2'],
    },
  ],
}];

export const mockClaimsTreeStudies = [
  {
    id: '1',
    name: 'Study 1',
    title: 'Study 1: Behavioral experiment (N = 40) with risky choice task, happiness ratings, and computational modeling.',
    summary: 'Participants performed three sessions outside the scanner; partner was another participant.',
    studyPageHref: '/mira/claims-tree/study/1',
  },
  {
    id: '2',
    name: 'Study 2',
    title: 'Study 2: fMRI experiment (N = 44) with identical task inside scanner, plus neuroimaging acquisition and analysis.',
    summary: 'Participants performed two sessions in the scanner; partner was an experimenter; fMRI data collected and analyzed with GLM, PPI, and LMMs.',
    studyPageHref: '/mira/claims-tree/study/2',
  },
];
