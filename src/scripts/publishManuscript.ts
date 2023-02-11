#!/usr/bin/env node

import * as yargs from 'yargs';

interface Args {
  doi: string;
  msid: string;
  articleType?: string;
  status?: string;
  dateReviewedPreprint?: string;
  datePostedToPreprintServer: string;
  urlPostedOnPreprintServer: string;
  preprintServer?: string;
  dateSentForPeerReview: string;
  msa?: string[];
  urlPdf?: string;
  versionManuscript?: number;
}

const args = yargs
  .option('doi', {
    type: 'string',
    describe: 'Preprint DOI',
    demandOption: true,
  })
  .option('msid', {
    type: 'string',
    describe: 'Manuscript ID',
    demandOption: true,
  })
  .option('articleType', {
    type: 'string',
    describe: 'articleType',
  })
  .option('status', {
    type: 'string',
    describe: 'status',
  })
  .option('dateReviewedPreprint', {
    type: 'string',
    describe: 'Reviewed Preprint posted (YYYY-MM-DD)',
  })
  .option('datePostedToPreprintServer', {
    type: 'string',
    describe: 'Posted to preprint server (YYYY-MM-DD)',
    demandOption: true,
  })
  .option('urlPostedOnPreprintServer', {
    type: 'string',
    describe: 'Posted to preprint server (url)',
    demandOption: true,
  })
  .option('preprintServer', {
    type: 'string',
    describe: 'Preprint server',
  })
  .option('dateSentForPeerReview', {
    type: 'string',
    describe: 'Sent for peer review (YYYY-MM-DD)',
    demandOption: true,
  })
  .option('msa', {
    type: 'array',
    describe: 'Subject areas (comma separated)',
  })
  .option('urlPdf', {
    type: 'string',
    describe: 'PDF location (url)',
  })
  .option('versionManuscript', {
    type: 'number',
    describe: 'Manuscript version',
  })
  .argv as Args;

const articleType: string = (args.articleType && args.articleType.trim() !== '') ? args.articleType.trim() : 'Reviewed Preprint';
const status: string = (args.status && args.status.trim() !== '') ? args.status.trim() : 'Published from the original preprint after peer review and assessment by eLife.';
const preprintServer: string = (args.preprintServer && args.preprintServer.trim() !== '') ? args.preprintServer.trim() : 'bioRxiv';
const msa: string[] | undefined = (args.msa && args.msa.length === 1) ? args.msa[0].split(',').map((i) => i.trim()) : args.msa;
const dateReviewedPreprint: string = (args.dateReviewedPreprint && args.dateReviewedPreprint.trim() !== '') ? args.dateReviewedPreprint.trim() : (new Date()).toISOString().split('T')[0];
const versionManuscript: number = args.versionManuscript ?? 1;

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

type Manuscript = {
  msid: string;
  version: string;
  publishedYear: number;
  preprintDoi: string;
};

type Manuscripts = {
  [msidVersion: string]: Manuscript;
};

type PreprintManuscripts = {
  preprints: Preprints,
  manuscripts: Manuscripts,
};

const newPreprints: Preprints = {
  [args.doi]: {
    ...{
      preprintDoi: args.doi,
      status: {
        articleType,
        status,
        timeline: [
          { name: 'Reviewed Preprint posted', date: dateReviewedPreprint },
          { name: `Posted to ${preprintServer}`, date: args.datePostedToPreprintServer, link: { url: args.urlPostedOnPreprintServer, text: `Go to ${preprintServer}` } },
          { name: 'Sent for peer review', date: args.dateSentForPeerReview },
        ].sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime())),
      },
      msas: msa,
    },
    ...((args.urlPdf && args.urlPdf.trim() !== '') ? { pdfUrl: args.urlPdf.trim() } : {}),
  },
};

const newManuscript: Manuscript = {
  msid: args.msid,
  version: `${versionManuscript}`,
  publishedYear: Number(dateReviewedPreprint.split('-')[0]),
  preprintDoi: args.doi,
};

const newManuscripts: Manuscripts = {
  [args.msid]: newManuscript,
  [`${args.msid}v${versionManuscript}`]: newManuscript,
};

const addManuscript = (preprintManuscripts: PreprintManuscripts | undefined, preprints: Preprints, manuscripts: Manuscripts) : void => {
  const data: PreprintManuscripts = (preprintManuscripts !== undefined) ? preprintManuscripts : { preprints: {}, manuscripts: {} };
  const updatedPreprints: Preprints = { ...data.preprints, ...preprints };
  const updatedManuscripts: Manuscripts = { ...data.manuscripts, ...manuscripts };

  const updatedData: PreprintManuscripts = {
    preprints: updatedPreprints,
    manuscripts: updatedManuscripts,
  };

  process.stdout.write(`${JSON.stringify(updatedData, null, 2)}\n`);
};

let input = '';

if (!process.stdin.isTTY) {
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', () => {
    addManuscript(input.length ? JSON.parse(input) : undefined, newPreprints, newManuscripts);
  });
} else {
  addManuscript(undefined, newPreprints, newManuscripts);
}

export {};
