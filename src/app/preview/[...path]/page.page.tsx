import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchContent, fetchMetadata } from '../../../utils/fetch-data';
import { ArticlePage } from '../../../components/pages/article/article-page';
import { ArticleFiguresTab, ArticleFullTextTab } from '../../../components/pages/article/tabs';

const extractIdAndTab = (idParts: string[]) => {
  if (['fulltext', 'figures'].includes(idParts[idParts.length - 1])) {
    return {
      tab: idParts.pop() as string,
      id: idParts.join('/'),
    };
  }
  return {
    tab: 'fulltext',
    id: idParts.join('/'),
  };
};

export const Page = async ({ params }: { params: { path: string[] } }): Promise<JSX.Element> => {
  const idParts = params?.path;
  if (idParts === undefined) {
    console.log('no id in path'); // eslint-disable-line no-console
    notFound();
  }

  const { tab, id } = extractIdAndTab(idParts);

  if (id === undefined) {
    console.log('id not found in path'); // eslint-disable-line no-console
    notFound();
  }

  const [serverMetaData, content] = await Promise.all([
    fetchMetadata(id),
    fetchContent(id),
  ]);

  const metaData = {
    ...serverMetaData,
    msid: `preview-${serverMetaData.doi}`,
    version: '0',
    pdfUrl: '',
    msas: [],
    publishedYear: new Date().getFullYear(),
  };
  const status = {
    articleType: 'Preview Preprint',
    status: 'This Preview Preprint isn\'t published yet.',
    timeline: [
      { name: 'Preview Preprint generated', date: new Date().toDateString() },
    ],
  };

  let childTab;
  if (tab === 'fulltext') {
    childTab = <ArticleFullTextTab content={content} metaData={metaData} peerReview={undefined}></ArticleFullTextTab>;
  } else {
    childTab = <ArticleFiguresTab content={content}></ArticleFiguresTab>;
  }
  return (
    <ArticlePage metaData={metaData} msidWithVersion={id} status={status} activeTab={tab} tabs={[
      {
        id: 'fulltext',
        linkElement: <Link scroll={false} href={`/preview/${id}`}>Full text</Link>,
      },
      {
        id: 'figures',
        linkElement: <Link scroll={false} href={`/preview/${id}/figures`}>Figures and data</Link>,
      },
    ]}>
      { childTab }
    </ArticlePage>
  );
};

export default Page;
