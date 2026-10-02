import { type GetServerSideProps } from 'next';
import { getClaimCardsForQuestion } from './claim-cards';
import { hardcodedMiraDocumentQuestions } from './data/hardcoded-mira-document-questions';
import { mockClaimsTreeStudies } from './data/mocks/mock-claims-tree-data';

export type ServerSideProps = {
  questions: Array<{
    questionNumber: string;
    text: string;
    claims: Array<{
      id: string;
      questionNumber: string;
      title: string;
      related: string[];
    }>
  }>;
  studies: Array<{
    id: string;
    name: string;
    title: string;
    summary: string;
    studyPageHref: string;
  }>;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => ({
  props: {
    questions: hardcodedMiraDocumentQuestions.map(({ questionNumber, title }) => ({
      questionNumber,
      text: title,
      claims: getClaimCardsForQuestion(questionNumber),
    })),
    studies: mockClaimsTreeStudies,
  },
});
