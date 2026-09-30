import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import { type ReactNode } from 'react';
import { hardcodedQuestions } from './data/hardcoded-questions';
import { mockClaimsTreeData } from './mock-claims-tree-data';
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
  summary: string,
  attribution: string,
  quote: string,
  claims: Array<Claim>,
};

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ query }) => {
  const question = hardcodedQuestions.find(({ questionNumber }) => questionNumber === query.id);

  if (!question) {
    return { notFound: true };
  }

  const claims = mockClaimsTreeData.find(({ questionNumber }) => questionNumber === question.questionNumber)?.claims ?? [];

  return { props: { ...question, claims } };
};

const Page = ({
  questionNumber, heading, title, summary, attribution, quote, claims,
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
