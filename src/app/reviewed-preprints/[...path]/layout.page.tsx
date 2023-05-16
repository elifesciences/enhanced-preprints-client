import { ArticlePageLayout } from '../../../components/layouts/article-page/article-page';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
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

  const manuscriptConfig = getManuscript(config.manuscriptConfigFile, id);

  const serverMetaData = await fetchMetadata(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`);

  const metaData = {
    ...serverMetaData,
    ...manuscriptConfig.pdfUrl ? { pdfUrl: manuscriptConfig.pdfUrl } : {},
    msid: manuscriptConfig.msid,
    version: manuscriptConfig.version,
    msas: manuscriptConfig.msas,
    publishedYear: manuscriptConfig.publishedYear,
  };
  const status = {
    articleType: 'Preview Preprint',
    status: 'This Preview Preprint isn\'t published yet.',
    timeline: [
      { name: 'Preview Preprint generated', date: new Date().toDateString() },
    ],
  };

  return (
    <ArticlePageLayout metaData={metaData} status={manuscriptConfig.status}>{children}</ArticlePageLayout>
  );
}
