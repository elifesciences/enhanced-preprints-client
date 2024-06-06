import { isExternalVersionSummary, isPreprintVersionSummary } from './type-guards';

const externalVersionSummary = {
  versionIdentifier: '3',
  published: new Date('2023-06-07T00:00:00.000Z'),
  url: 'https://elifesciences.org/articles/85111v1',
};
const preprintVersionSummary = {
  doi: '10.7554/eLife.85111.1',
  id: '85111v1',
  msid: '85111',
  preprintDoi: '10.1101/2022.11.08.515698',
  preprintPosted: new Date('2022-11-22T00:00:00.000Z'),
  preprintUrl: 'https://www.biorxiv.org/content/10.1101/2022.11.08.515698v2',
  published: new Date('2023-01-25T14:00:00.000Z'),
  versionIdentifier: '1',
};

describe('isExternalVersionSummary', () => {
  it('successfully identifies if a version summary is external', () => {
    expect(isExternalVersionSummary(preprintVersionSummary)).toBeFalsy();
    expect(isExternalVersionSummary(externalVersionSummary)).toBeTruthy();
  });
});

describe('isPreprintVersionSummary', () => {
  it('successfully identifies if a version summary is a preprint', () => {
    expect(isPreprintVersionSummary(externalVersionSummary)).toBeFalsy();
    expect(isPreprintVersionSummary(preprintVersionSummary)).toBeTruthy();
  });
});
