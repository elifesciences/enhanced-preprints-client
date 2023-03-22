import axios from 'axios';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getManuscript } from '../../../manuscripts';
import { config } from '../../../config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { filename } = req.query;
  if (filename !== undefined) {
    const { name, ext } = path.parse(Array.isArray(filename) ? filename[0] : filename);

    const manuscript = getManuscript(config.manuscriptConfigFile, name);

    if (manuscript !== undefined && name !== undefined && (ext === '.bib' || ext === '.ris')) {
      const extReq = await axios.get(
        `${config.apiServer}/api/citations/${manuscript.preprintDoi}/${ext === '.bib' ? 'bibtex' : 'ris'}`,
      );

      const citation = decodeURI(extReq.data);

      if (citation) {
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', ext === '.bib' ? 'application/x-bibtex' : 'application/x-research-info-systems');
        res.status(200).send(citation);
      } else {
        res.status(400).send(`Unable to retrieve citation ${filename}`);
      }
    } else {
      res.status(400).send(`Cannot find msid configured (${name})`);
    }
  }
};
