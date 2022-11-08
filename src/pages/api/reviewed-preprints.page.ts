import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';
import { manuscripts } from '../../manuscripts';
import { jsonFetch } from '../../utils/json-fetch';
import { MetaData } from '../../types';
import { SubjectList } from '../../components/molecules/article-flag-list/article-flag-list';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ids = Object.keys(manuscripts).filter(id => id.match(/^[0-9]+$/));

  const meta = await Promise.all(ids.map(async id => jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscripts[id].preprintDoi}/metadata`).then(js => js.title)));

  // res.status(200).json({
  //   total: ids.length,
  //   items: ids.map(id => ({
  //     id,
  //     doi: manuscripts[id].preprintDoi,
  //     pdf: manuscripts[id].pdfUrl,
  //     status: "reviewed",
  //     stage: "published",
  //     subjects: SubjectList({ msas: manuscripts[id].msas }),
  //   })),
  // });

  res.status(200).json({
    total: ids.length,
    items: meta,
  });
};
