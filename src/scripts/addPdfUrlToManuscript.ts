#!/usr/bin/env node

import * as yargs from 'yargs';

interface Args {
  msid: string;
  versionManuscript?: number,
  urlPdf?: string;
}

const args = yargs
  .option('msid', {
    type: 'string',
    describe: 'Manuscript ID',
    demandOption: true,
  })
  .option('versionManuscript', {
    type: 'number',
    describe: 'Version',
  })
  .option('urlPdf', {
    type: 'string',
    describe: 'PDF location (url)',
  })
  .argv as Args;

const latestVersion = (msid: string, manuscripts: Manuscripts) => Object.keys(manuscripts).filter((id) => id.startsWith(`${msid}v`)).length;

type Manuscript = {
  msid: string;
  version: number;
  publishedYear: number;
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
};

type Manuscripts = {
  [msidVersion: string]: Manuscript | string;
};

type PreprintManuscripts = {
  manuscripts: Manuscripts,
};

const addPdfUrlToManuscript = (preprintManuscripts: PreprintManuscripts, id: string, pdfUrl: string) : void => {
  if (!(id in preprintManuscripts.manuscripts)) {
    throw new Error(`id not found in manuscripts.json (${id})`);
  }

  const updatedData: PreprintManuscripts = preprintManuscripts;

  updatedData.manuscripts[id] = {
    // @ts-ignore
    ...preprintManuscripts.manuscripts[id],
    ...{ pdfUrl },
  };

  process.stdout.write(`${JSON.stringify(updatedData, null, 2)}\n`);
};

let input = '';

if (!process.stdin.isTTY) {
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', () => {
    const inputJson = JSON.parse(input);
    const v = args.versionManuscript ? args.versionManuscript : latestVersion(args.msid, inputJson.manuscripts);
    const urlPdf = args.urlPdf ? args.urlPdf : `https://github.com/elifesciences/enhanced-preprints-data/raw/master/data/${args.msid}/v${v}/${args.msid}-v${v}.pdf`;
    addPdfUrlToManuscript(inputJson, `${args.msid}v${v}`, urlPdf);
  });
}

export {};
