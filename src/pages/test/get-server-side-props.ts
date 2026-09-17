import { type GetServerSideProps } from 'next';
import { mockClaimsTreeData } from './mock-claims-tree-data';

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
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => ({
  props: {
    questions: mockClaimsTreeData,
  },
});
