#!/usr/bin/env node

import * as yargs from 'yargs';
import { addManuscript } from './publishManuscript';

interface Args {
  msid: string;
  doi: string;
  dateReviewedPreprint: string;
  dateSentForPeerReview?: string;
  datePostedToPreprintServer?: string;
  urlPostedOnPreprintServer?: string;
  preprintServer?: string;
  msa?: string[];
}

const todayDate = (new Date()).toISOString().split('T')[0];

const args = yargs
  .option('msid', {
    type: 'string',
    describe: 'Manuscript ID',
    demandOption: true,
  })
  .option('doi', {
    type: 'string',
    describe: 'Preprint DOI',
    demandOption: true,
  })
  .option('dateReviewedPreprint', {
    type: 'string',
    describe: `Reviewed/Revised Preprint posted (YYYY-MM-DD) (default: ${todayDate})`,
  })
  .option('dateSentForPeerReview', {
    type: 'string',
    describe: 'Sent for peer review (YYYY-MM-DD)',
  })
  .option('datePostedToPreprintServer', {
    type: 'string',
    describe: 'Posted to preprint server (YYYY-MM-DD)',
  })
  .option('urlPostedOnPreprintServer', {
    type: 'string',
    describe: 'Posted to preprint server (url)',
  })
  .option('preprintServer', {
    type: 'string',
    describe: 'Preprint server (default: bioRxiv)',
  })
  .option('msa', {
    type: 'array',
    describe: 'Subject areas (comma separated)',
  })
  .argv as Args;

let input = '';

if (!process.stdin.isTTY) {
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });

  process.stdin.on('end', () => {
    const updatedManuscripts = addManuscript(
      input.length ? JSON.parse(input) : { preprints: {}, manuscripts: {} },
      args.doi,
      args.msid,
      (args.msa && args.msa.length === 1) ? args.msa[0].split(',').map((i) => i.trim()).filter((i) => i.length !== 0) : args.msa,
      args.preprintServer,
      args.datePostedToPreprintServer,
      args.urlPostedOnPreprintServer,
      args.dateReviewedPreprint,
      args.dateSentForPeerReview,
    );

    process.stdout.write(`${JSON.stringify(updatedManuscripts, null, 2)}\n`);
  });
}

export {};
