import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';
import { manuscripts } from '../../manuscripts';
import { SubjectList } from '../../components/molecules/article-flag-list/article-flag-list';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ids = Object.keys(manuscripts).filter(id => id.match(/^[0-9]+$/));

  res.status(200).json({
    total: ids.length,
    items: ids.map(id => ({
      id,
      doi: manuscripts[id].preprintDoi,
      pdf: manuscripts[id].pdfUrl,
      status: "reviewed",
      stage: "published",
      subjects: SubjectList({ msas: manuscripts[id].msas }),
    })),
  });
};