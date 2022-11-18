import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';
import { manuscripts } from '../../manuscripts';
import { jsonFetch } from '../../utils/json-fetch';
import { Author, Content, MetaData } from '../../types';
import { SubjectList } from '../../components/molecules/article-flag-list/article-flag-list';

const wrapContent = (content: Content, type: string) : string => {
  let tag = null;

  if (type === 'Emphasis') {
    tag = 'i';
  } else if (type === 'Subscript') {
    tag = 'sub';
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return (tag ? `<${tag}>` : '') + renderContent(content) + (tag ? `</${tag}>` : '');
};

const renderContent = (content: Content) : string => {
  if (Array.isArray(content)) {
    return content.map((i: Content) => {
      if (typeof i === 'string') {
        return i;
      }

      if (
        !Array.isArray(i) &&
        (
          i.type === 'Emphasis' ||
          i.type === 'Subscript'
        )
      ) {
        return wrapContent(i.content, i.type);
      }

      return '';
    }).join(' ');
  }

  return content as string;
};

const prepareAuthor = (author: Author) : string => `${author.givenNames.join(' ')} ${author.familyNames.join(' ')}`;

const prepareAuthors = (authors: Author[]) : string => {
  let authorLine = '';

  if (authors.length > 0) {
    authorLine += prepareAuthor(authors[0]);
  }

  if (authors.length > 1) {
    authorLine += `, ${prepareAuthor(authors[1])}`;
  }

  if (authors.length > 2) {
    authorLine += `${(authors.length > 3) ? ' ... ' : ', '}${prepareAuthor(authors[authors.length - 1])}`;
  }

  return authorLine;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ids = Object.keys(manuscripts).filter((id) => id.match(/^[0-9]+$/)).sort();

  const meta = await Promise.all(ids.map(async (id) => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscripts[id].preprintDoi}/metadata`).then((js) => ({
    id,
    title: renderContent(js.title),
    authorLine: prepareAuthors(js.authors),
  }))));

  const items = ids.map((id) => {
    const iMeta = meta.find((obj) => obj.id === id);

    return {
      id,
      doi: manuscripts[id].preprintDoi,
      pdf: manuscripts[id].pdfUrl,
      status: 'reviewed',
      authorLine: iMeta?.authorLine,
      title: iMeta?.title,
      stage: 'published',
      subjects: SubjectList({ msas: manuscripts[id].msas }),
    };
  });

  res.status(200).json({
    total: ids.length,
    items,
  });
};
