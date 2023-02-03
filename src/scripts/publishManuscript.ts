#!/usr/bin/env node

import * as yargs from 'yargs';
import * as fs from 'fs';

interface Args {
  doi: string;
  msid: string;
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
    default: 'bioRxiv',
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
    default: 1,
  })
  .argv as Args;

const msa = (args.msa && args.msa.length === 1) ? args.msa[0].split(',').map(i => i.trim()) : args.msa;
const dateReviewedPreprint = args.dateReviewedPreprint ?? (new Date()).toISOString().split('T')[0];

const preprint = {
  [args.doi]: {
    ...{
      "preprintDoi": args.doi,
      "status": {
        "articleType": "Reviewed Preprint",
        "status": "Published from the original preprint after peer review and assessment by eLife.",
        "timeline": [
          { "name": "Reviewed Preprint posted", "date": dateReviewedPreprint },
          { "name": `Posted to ${args.preprintServer}`, "date": args.datePostedToPreprintServer, "link": { "url": args.urlPostedOnPreprintServer, "text": `Go to ${args.preprintServer}` } },
          { "name": "Sent for peer review", "date": args.dateSentForPeerReview }
        ]
      },
      "msas": msa,
    },
    ...(args.urlPdf ? { pdfUrl: args.urlPdf } : {})
  }, 
};

const manuscript = {
  "msid": args.msid,
  "version": `${args.versionManuscript}`,
  "publishedYear": Number(dateReviewedPreprint.split('-')[0]),
  "preprintDoi": args.doi,
};

const manuscripts = {
  [args.msid] : manuscript,
  [`${args.msid}v${args.versionManuscript}`] : manuscript,
};

fs.readFile("manuscripts.json", "utf-8", (err, data) => {
  if (err) throw err;

  const existingData = JSON.parse(data);

  const updatedPreprints = { ...existingData.preprints, ...preprint };
  const updatedManuscripts = { ...existingData.manuscripts, ...manuscripts };

  const updatedData = {
    preprints: updatedPreprints,
    manuscripts: updatedManuscripts
  };

  fs.writeFile("manuscripts.json", `${JSON.stringify(updatedData, null, 2)}${"\n"}`, err => {
    if (err) throw err;
  });
});

export {};
