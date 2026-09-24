import Head from 'next/head';
import { type ReactNode } from 'react';
import { BlankLayout } from '../../components/layouts/blank';
import { ClaimsTreeQuestionPage } from '../../components/pages/mira/claims-tree/claims-tree-question-page';

const claimsData = {
  heading: 'Question:',
  summary: 'The paper investigates how responsibility for a partner\'s outcomes in risky choices evokes guilt and which brain regions are involved.',
  attribution: 'Quoted text in Abstract:',
  quote: 'The neural mechanisms underlying guilt evoked during such situations of social responsibility are still unknown.',
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
};

const Page = () => (
  <>
    <Head>
      <title>Claims Tree Question 1</title>
    </Head>
    <ClaimsTreeQuestionPage
      heading={claimsData.heading}
      summary={claimsData.summary}
      attribution={claimsData.attribution}
      quote={claimsData.quote}
      claims={claimsData.claims}
    ></ClaimsTreeQuestionPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <BlankLayout>{page}</BlankLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
