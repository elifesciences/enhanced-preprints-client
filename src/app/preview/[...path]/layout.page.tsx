import { ArticlePageLayout } from '../../../components/layouts/article-page/article-page';
import { fetchMetadata } from '../../../utils/fetch-data';
import { getIdFromPath } from './page.page';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { path: string[] }
}) {
  const { id } = getIdFromPath(params.path);

  const serverMetaData = await fetchMetadata(id);

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

  return (
    <ArticlePageLayout metaData={metaData} status={status}>{children}</ArticlePageLayout>
  );
}
