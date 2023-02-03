#!/usr/bin/env node

import * as yargs from 'yargs';

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

console.log(`Preprint DOI: ${args.doi}`);
console.log(`Manuscript ID: ${args.msid || 'Not provided'}`);
console.log(`Reviewed Preprint posted (YYYY-MM-DD): ${args.dateReviewedPreprint || 'Not provided'}`);
console.log(`Posted to preprint server (YYYY-MM-DD): ${args.datePostedToPreprintServer}`);
console.log(`Posted to preprint server (url): ${args.urlPostedOnPreprintServer}`);
console.log(`Preprint server: ${args.preprintServer}`);
console.log(`Sent for peer review (YYYY-MM-DD): ${args.dateSentForPeerReview}`);
console.log(`msa: ${args.msa?.join(' | ') || 'Not provided'}`);
console.log(`PDF location (url): ${args.urlPdf || 'Not provided'}`);
console.log(`Manuscript version: ${args.versionManuscript}`);

export {};
