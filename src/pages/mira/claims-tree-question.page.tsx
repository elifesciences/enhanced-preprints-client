import Head from 'next/head';
import { type ReactNode } from 'react';
import { hardcodedQuestions } from './data/hardcoded-questions';
import { mockClaimsTreeData } from './mock-claims-tree-data';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeQuestionPage } from '../../components/pages/mira/claims-tree/question/claims-tree-question-page';

const [question] = hardcodedQuestions;
const claims = mockClaimsTreeData.find(({ questionNumber }) => questionNumber === question.questionNumber)?.claims ?? [];

const Page = () => (
  <>
    <Head>
      <title>{`Claims Tree Question ${question.questionNumber}`}</title>
    </Head>
    <ClaimsTreeQuestionPage
      questionNumber={question.questionNumber}
      heading={question.heading}
      title={question.title}
      summary={question.summary}
      attribution={question.attribution}
      quote={question.quote}
      claims={claims}
    ></ClaimsTreeQuestionPage>
  </>
);

Page.getLayout = function getLayout(page: ReactNode) {
  return (
    <ClaimsTreeLayout>{page}</ClaimsTreeLayout>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
