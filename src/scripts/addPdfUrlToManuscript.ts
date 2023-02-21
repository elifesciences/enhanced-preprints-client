#!/usr/bin/env node

import * as yargs from 'yargs';

interface Args {
  doi: string;
  urlPdf: string;
}

const args = yargs
  .option('doi', {
    type: 'string',
    describe: 'Preprint DOI',
    demandOption: true,
  })
  .option('urlPdf', {
    type: 'string',
    describe: 'PDF location (url)',
    demandOption: true,
  })
  .argv as Args;

type Preprint = {
  preprintDoi: string;
  status: {
    articleType: string;
    status: string;
    timeline: {
      name: string;
      date: string;
      link?: {
        url: string;
        text: string;
      }
    }[]
  };
  pdfUrl?: string;
  msas?: string[];
};

type Preprints = {
  [preprintDoi: string]: Preprint;
};

type PreprintManuscripts = {
  preprints: Preprints,
};

const addPdfUrlToManuscript = (preprintManuscripts: PreprintManuscripts, preprintDoi: string, pdfUrl: string) : void => {
  if (!(preprintDoi in preprintManuscripts.preprints)) {
    throw new Error(`doi not found in manuscripts.json (${preprintDoi})`);
  }

  preprintManuscripts.preprints[preprintDoi] = {
    ...preprintManuscripts.preprints[preprintDoi],
    pdfUrl,
  };

  process.stdout.write(`${JSON.stringify(preprintManuscripts, null, 2)}\n`);
};

let input = '';

if (!process.stdin.isTTY) {
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', () => {
    addPdfUrlToManuscript(JSON.parse(input), args.doi, args.urlPdf);
  });
}

export {};
