import { getManuscript, getManuscripts, getManuscriptsLatest } from './manuscripts';

describe('getManuscripts', () => {
  it('populates the manuscript configs from the json data file', () => {
    const result = getManuscripts('./test-utils/data/example_manuscripts.json');

    expect(result).toStrictEqual({
      msid1: {
        msid: 'msid1',
        version: '1',
        preprintDoi: 'preprintprovider/preprint1',
        status: {
          articleType: 'Reviewed Preprint',
          status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
          timeline: [
            { name: 'Reviewed preprint posted', date: '2022-10-20' },
            { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
            { name: 'Sent for peer review', date: '2022-06-24' },
          ],
        },
        pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
        msas: ['Cell Biology'],
      },
      msid1v1: {
        msid: 'msid1',
        version: '1',
        preprintDoi: 'preprintprovider/preprint1',
        status: {
          articleType: 'Reviewed Preprint',
          status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
          timeline: [
            { name: 'Reviewed preprint posted', date: '2022-10-20' },
            { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
            { name: 'Sent for peer review', date: '2022-06-24' },
          ],
        },
        pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
        msas: ['Cell Biology'],
      },
      msid2: {
        msid: 'msid2',
        version: '2',
        preprintDoi: 'preprintprovider/preprint1',
        status: {
          articleType: 'Reviewed Preprint',
          status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
          timeline: [
            { name: 'Reviewed preprint posted', date: '2022-10-20' },
            { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
            { name: 'Sent for peer review', date: '2022-06-24' },
          ],
        },
        pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
        msas: ['Cell Biology'],
      },
    });
  });
});

describe('getManuscriptsLatest', () => {
  it('populates the manuscript configs from the json data file with latest data', () => {
    const result = getManuscriptsLatest('./test-utils/data/example_manuscripts.json');

    expect(result).toStrictEqual({
      msid1: {
        msid: 'msid1',
        version: '1',
        preprintDoi: 'preprintprovider/preprint1',
        status: {
          articleType: 'Reviewed Preprint',
          status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
          timeline: [
            { name: 'Reviewed preprint posted', date: '2022-10-20' },
            { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
            { name: 'Sent for peer review', date: '2022-06-24' },
          ],
        },
        pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
        msas: ['Cell Biology'],
      },
      msid2: {
        msid: 'msid2',
        version: '2',
        preprintDoi: 'preprintprovider/preprint1',
        status: {
          articleType: 'Reviewed Preprint',
          status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
          timeline: [
            { name: 'Reviewed preprint posted', date: '2022-10-20' },
            { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
            { name: 'Sent for peer review', date: '2022-06-24' },
          ],
        },
        pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
        msas: ['Cell Biology'],
      },
    });
  });
});

describe('getManuscript', () => {
  it('retreives a single manuscript config from the json data file', () => {
    const result = getManuscript('./test-utils/data/example_manuscripts.json', 'msid1');

    expect(result).toStrictEqual({
      msid: 'msid1',
      version: '1',
      preprintDoi: 'preprintprovider/preprint1',
      status: {
        articleType: 'Reviewed Preprint',
        status: 'This Reviewed Preprint was published after peer review and assessment by eLife.',
        timeline: [
          { name: 'Reviewed preprint posted', date: '2022-10-20' },
          { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.preprintprovider.org/content/preprint1', text: 'Go to preprintprovider' } },
          { name: 'Sent for peer review', date: '2022-06-24' },
        ],
      },
      pdfUrl: 'https://www.preprintprovider.org/content/preprint1.pdf',
      msas: ['Cell Biology'],
    });
  });

  it('retreives an undefined when manuscript is not in config from the json data file', () => {
    const result = getManuscript('./test-utils/data/example_manuscripts.json', 'msid3');

    expect(result).toBeUndefined();
  });
});
