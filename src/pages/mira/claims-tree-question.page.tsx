import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { type ReactNode } from 'react';
import { getClaimCardsForQuestion } from './claim-cards';
import { hardcodedMiraDocumentQuestions } from './data/hardcoded-mira-document-questions';
import { ClaimsTreeLayout } from '../../components/layouts/mira/claims-tree';
import { ClaimsTreeQuestionPage } from '../../components/pages/mira/claims-tree/question/claims-tree-question-page';

type Claim = {
  id: string,
  questionNumber: string,
  title: string,
  related: Array<string>,
};

type ServerSideProps = {
  questionNumber: string,
  heading: string,
  title: string,
  summary?: string,
  attribution?: string,
  quote?: string,
  claims: Array<Claim>,
  previousQuestionNumber?: string,
  nextQuestionNumber?: string,
};

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ query }) => {
  const question = hardcodedMiraDocumentQuestions.find(({ questionNumber }) => questionNumber === query.id);

  if (!question) {
    return { notFound: true };
  }

  const claims = getClaimCardsForQuestion(question.questionNumber);

  const index = hardcodedMiraDocumentQuestions.indexOf(question);
  const previousQuestion = hardcodedMiraDocumentQuestions[index - 1];
  const nextQuestion = hardcodedMiraDocumentQuestions[index + 1];

  return {
    props: {
      ...question,
      claims,
      ...(previousQuestion && { previousQuestionNumber: previousQuestion.questionNumber }),
      ...(nextQuestion && { nextQuestionNumber: nextQuestion.questionNumber }),
    },
  };
};

const Page = ({
  questionNumber, heading, title, summary, attribution, quote, claims, previousQuestionNumber, nextQuestionNumber,
}: ServerSideProps) => (
  <>
    <Head>
      <title>{`Claims Tree Question ${questionNumber}`}</title>
    </Head>
    <ClaimsTreeQuestionPage
      questionNumber={questionNumber}
      heading={heading}
      title={title}
      summary={summary}
      attribution={attribution}
      quote={quote}
      claims={claims}
      previousQuestionNumber={previousQuestionNumber}
      nextQuestionNumber={nextQuestionNumber}
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
