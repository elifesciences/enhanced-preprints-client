import { type GetServerSideProps } from 'next';
import { mockClaimsTreeData, mockClaimsTreeStudies } from './mock-claims-tree-data';

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
    questions: mockClaimsTreeData,
    studies: mockClaimsTreeStudies,
  },
});
