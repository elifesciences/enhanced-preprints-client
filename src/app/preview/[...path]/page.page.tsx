import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchContent, fetchMetadata } from '../../../utils/fetch-data';
import { ArticleFiguresTab, ArticleFullTextTab } from '../../../components/pages/article/tabs';

const extractIdAndTab = (idParts: string[]) => {
  if (idParts === undefined) {
    console.log('no id in path'); // eslint-disable-line no-console
    notFound();
  }

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

export const getIdFromPath = (id: string[]) => {
  const extracted = extractIdAndTab(id);
  if (extracted.id === undefined) {
    console.log('id not found in path'); // eslint-disable-line no-console
    notFound();
  }
  return extracted;
};

export const Page = async ({ params }: { params: { path: string[] } }): Promise<JSX.Element> => {
  const { tab: activeTab, id } = getIdFromPath(params.path);

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

  let childTab;
  if (activeTab === 'fulltext') {
    childTab = <ArticleFullTextTab content={content} metaData={metaData} peerReview={undefined}></ArticleFullTextTab>;
  } else {
    childTab = <ArticleFiguresTab content={content}></ArticleFiguresTab>;
  }
  const tabs = [
    {
      id: 'fulltext',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/preview/${id}#tab-content`}>Full text</Link>,
    },
    {
      id: 'figures',
      linkElement: <Link scroll={true} prefetch={true} shallow={true} href={`/preview/${id}/figures#tab-content`}>Figures and data</Link>,
    },
  ];
  return (
    <>
      <nav className="tabbed-navigation" aria-label="Main tabbed navigation">
        <ul className="tabbed-navigation__tabs">
          {tabs.map((tab, index) => (
            <li key={index} className={`tabbed-navigation__tab-label${activeTab === tab.id ? ' tabbed-navigation__tab-label--active' : ''}`}>
              {tab.linkElement}
            </li>
          ))}
        </ul>
      </nav>
      <a id="tab-content" />
      {childTab}
  </>
  );
};

export default Page;
