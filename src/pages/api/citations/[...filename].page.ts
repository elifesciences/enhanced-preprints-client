import axios from 'axios';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getManuscript } from '../../../manuscripts';
import { config } from '../../../config';
import { errorNotFoundRequest } from '../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { filename } = req.query;
  if (filename !== undefined) {
    const { name, ext } = path.parse(Array.isArray(filename) ? filename[0] : filename);

    const manuscript = getManuscript(config.manuscriptConfigFile, name);

    if (manuscript !== undefined) {
      let type;
      switch (ext) {
        case '.ris':
          type = 'application/x-research-info-systems';
          break;
        default:
          type = 'application/x-bibtex';
      }

      const extReq = await axios.get(
        `https://api.crossref.org/works/${manuscript.preprintDoi}/transform/${type}`,
      );

      const citation = decodeURI(extReq.data);

      if (citation) {
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', type);
        res.status(200).send(citation);
      } else {
        console.log(`Unable to retrieve citation ${filename}`); // eslint-disable-line no-console
      }
    } else {
      console.log(`Cannot find msid configured (${name})`); // eslint-disable-line no-console
    }

    errorNotFoundRequest(res);
  }
};
