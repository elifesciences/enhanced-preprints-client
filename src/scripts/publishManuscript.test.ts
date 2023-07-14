import { addManuscript } from './publishManuscript';

describe('addManuscript', () => {
  describe('preprints', () => {
    it('preprints empty - minimal', () => {
      const { preprints } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/minimal', '11111');

      expect(preprints).toStrictEqual({
        '10.1101/minimal': {
          preprintDoi: '10.1101/minimal',
        },
      });
    });

    it('preprints empty - with msa', () => {
      const { preprints } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/with-msa', '11111', ['Biochemistry and Chemical Biology', 'Cancer Biology']);

      expect(preprints).toStrictEqual({
        '10.1101/with-msa': {
          preprintDoi: '10.1101/with-msa',
          msas: [
            'Biochemistry and Chemical Biology',
            'Cancer Biology',
          ],
        },
      });
    });

    it('preprints empty - with invalid msa', () => {
      expect(() => {
        addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/with-msa', '11111', ['foo']);
      }).toThrow(new Error('msa not recognised: foo'));

      expect(() => {
        addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/with-msa', '11111', ['Biochemistry and Chemical Biology', 'foo', 'Cancer Biology', 'bar']);
      }).toThrow(new Error('msa not recognised: foo, bar'));
    });

    it('preprints existing - no match', () => {
      const { preprints } = addManuscript({
        preprints: {
          '10.1101/existing': {
            preprintDoi: '10.1101/existing',
          },
        },
        manuscripts: {},
      }, '10.1101/no-match', '11111');

      expect(preprints).toStrictEqual({
        '10.1101/existing': {
          preprintDoi: '10.1101/existing',
        },
        '10.1101/no-match': {
          preprintDoi: '10.1101/no-match',
        },
      });
    });

    it('preprints existing - match', () => {
      const { preprints } = addManuscript({
        preprints: {
          '10.1101/existing': {
            preprintDoi: '10.1101/existing',
          },
        },
        manuscripts: {},
      }, '10.1101/existing', '11111');

      expect(preprints).toStrictEqual({
        '10.1101/existing': {
          preprintDoi: '10.1101/existing',
        },
      });
    });

    it('preprints existing - match with existing msa', () => {
      const { preprints } = addManuscript({
        preprints: {
          '10.1101/existing': {
            preprintDoi: '10.1101/existing',
            msas: [
              'Biochemistry and Chemical Biology',
              'Cancer Biology',
            ],
          },
        },
        manuscripts: {},
      }, '10.1101/existing', '11111');

      expect(preprints).toStrictEqual({
        '10.1101/existing': {
          preprintDoi: '10.1101/existing',
          msas: [
            'Biochemistry and Chemical Biology',
            'Cancer Biology',
          ],
        },
      });
    });

    it('preprints existing - match with existing msa - msa empty string', () => {
      const { preprints } = addManuscript({
        preprints: {
          '10.1101/existing': {
            preprintDoi: '10.1101/existing',
            msas: [
              'Biochemistry and Chemical Biology',
              'Cancer Biology',
            ],
          },
        },
        manuscripts: {},
      }, '10.1101/existing', '11111', []);

      expect(preprints).toStrictEqual({
        '10.1101/existing': {
          preprintDoi: '10.1101/existing',
          msas: [
            'Biochemistry and Chemical Biology',
            'Cancer Biology',
          ],
        },
      });
    });

    it('preprints existing - match with new msa', () => {
      const { preprints } = addManuscript({
        preprints: {
          '10.1101/existing': {
            preprintDoi: '10.1101/existing',
            msas: [
              'Biochemistry and Chemical Biology',
              'Cancer Biology',
            ],
          },
        },
        manuscripts: {},
      }, '10.1101/existing', '11111', ['Cell Biology', 'Chromosomes and Gene Expression']);

      expect(preprints).toStrictEqual({
        '10.1101/existing': {
          preprintDoi: '10.1101/existing',
          msas: [
            'Cell Biology',
            'Chromosomes and Gene Expression',
          ],
        },
      });
    });
  });

  describe('manuscripts', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2023-04-23'));
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('manuscripts empty - minimal', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/minimal', '11111');

      expect(manuscripts).toStrictEqual({
        11111: '11111v1',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/minimal',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-23',
                name: 'Reviewed preprint posted',
                eventDescription: '(this version)',
              },
            ],
          },
          version: 1,
        },
      });
    });

    it('manuscripts empty - may have preprint posted - without server', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/with-server', '11111', undefined, 'preprint server', '2022-01-01', 'https://preprint.url');

      expect(manuscripts['11111v1']).toStrictEqual({
        msid: '11111',
        preprintDoi: '10.1101/with-server',
        publishedYear: 2023,
        status: {
          articleType: 'Reviewed Preprint',
          status: 'Published from the original preprint after peer review and assessment by eLife.',
          timeline: [
            {
              date: '2023-04-23',
              name: 'Reviewed preprint posted',
              eventDescription: '(this version)',
            },
            {
              date: '2022-01-01',
              link: {
                text: 'Go to preprint server',
                url: 'https://preprint.url',
              },
              name: 'Posted to preprint server',
            },
          ],
        },
        version: 1,
      });
    });

    it('manuscripts empty - may have preprint posted - with server', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/without-server', '11111', undefined, undefined, '2022-01-01', 'https://preprint.url');

      expect(manuscripts['11111v1']).toStrictEqual({
        msid: '11111',
        preprintDoi: '10.1101/without-server',
        publishedYear: 2023,
        status: {
          articleType: 'Reviewed Preprint',
          status: 'Published from the original preprint after peer review and assessment by eLife.',
          timeline: [
            {
              date: '2023-04-23',
              name: 'Reviewed preprint posted',
              eventDescription: '(this version)',
            },
            {
              date: '2022-01-01',
              link: {
                text: 'Go to bioRxiv',
                url: 'https://preprint.url',
              },
              name: 'Posted to bioRxiv',
            },
          ],
        },
        version: 1,
      });
    });

    it('manuscripts empty - may have reviewed preprint date', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/with-reviewed-preprint-date', '11111', undefined, undefined, undefined, undefined, '2020-01-02');

      expect(manuscripts['11111v1']).toStrictEqual({
        msid: '11111',
        preprintDoi: '10.1101/with-reviewed-preprint-date',
        publishedYear: 2020,
        status: {
          articleType: 'Reviewed Preprint',
          status: 'Published from the original preprint after peer review and assessment by eLife.',
          timeline: [
            {
              date: '2020-01-02',
              name: 'Reviewed preprint posted',
              eventDescription: '(this version)',
            },
          ],
        },
        version: 1,
      });
    });

    it('manuscripts empty - may have sent for peer review date', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/with-peer-review-date', '11111', undefined, undefined, undefined, undefined, undefined, '2020-01-02');

      expect(manuscripts).toStrictEqual({
        11111: '11111v1',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/with-peer-review-date',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-23',
                name: 'Reviewed preprint posted',
                eventDescription: '(this version)',
              },
              {
                date: '2020-01-02',
                name: 'Sent for peer review',
              },
            ],
          },
          version: 1,
        },
      });
    });

    it('manuscripts empty - sort timeline 1', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/sort-timeline-1', '11111', undefined, undefined, '2020-01-01', 'https://preprint.url', '2020-01-02', '2020-01-07');

      expect(manuscripts).toStrictEqual({
        11111: '11111v1',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/sort-timeline-1',
          publishedYear: 2020,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2020-01-07',
                name: 'Sent for peer review',
              },
              {
                date: '2020-01-02',
                name: 'Reviewed preprint posted',
                eventDescription: '(this version)',
              },
              {
                date: '2020-01-01',
                link: {
                  text: 'Go to bioRxiv',
                  url: 'https://preprint.url',
                },
                name: 'Posted to bioRxiv',
              },
            ],
          },
          version: 1,
        },
      });
    });

    it('manuscripts empty - sort timeline 2', () => {
      const { manuscripts } = addManuscript({ preprints: {}, manuscripts: {} }, '10.1101/sort-timeline-2', '11111', undefined, undefined, '2020-01-01', 'https://preprint.url', '2020-01-07', '2020-01-02');

      expect(manuscripts).toStrictEqual({
        11111: '11111v1',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/sort-timeline-2',
          publishedYear: 2020,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2020-01-07',
                name: 'Reviewed preprint posted',
                eventDescription: '(this version)',
              },
              {
                date: '2020-01-02',
                name: 'Sent for peer review',
              },
              {
                date: '2020-01-01',
                link: {
                  text: 'Go to bioRxiv',
                  url: 'https://preprint.url',
                },
                name: 'Posted to bioRxiv',
              },
            ],
          },
          version: 1,
        },
      });
    });

    it('manuscripts existing - no match - minimal', () => {
      const { manuscripts } = addManuscript({
        preprints: {},
        manuscripts: {
          11111: '11111v1',
          '11111v1': {
            msid: '11111',
            preprintDoi: '10.1101/existing',
            publishedYear: 2023,
            status: {
              articleType: 'Reviewed Preprint',
              status: 'Published from the original preprint after peer review and assessment by eLife.',
              timeline: [
                {
                  date: '2023-04-22',
                  name: 'Reviewed preprint posted',
                  eventDescription: '(this version)',
                },
              ],
            },
            version: 1,
          },
        },
      }, '10.1101/no-match', '22222');

      expect(manuscripts).toStrictEqual({
        11111: '11111v1',
        22222: '22222v1',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-22',
                name: 'Reviewed preprint posted',
                eventDescription: '(this version)',
              },
            ],
          },
          version: 1,
        },
        '22222v1': {
          msid: '22222',
          preprintDoi: '10.1101/no-match',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-23',
                name: 'Reviewed preprint posted',
                eventDescription: '(this version)',
              },
            ],
          },
          version: 1,
        },
      });
    });

    it('manuscripts existing - match - minimal version 2', () => {
      const { manuscripts } = addManuscript({
        preprints: {},
        manuscripts: {
          11111: '11111v1',
          '11111v1': {
            msid: '11111',
            preprintDoi: '10.1101/existing',
            publishedYear: 2023,
            status: {
              articleType: 'Reviewed Preprint',
              status: 'Published from the original preprint after peer review and assessment by eLife.',
              timeline: [
                {
                  date: '2023-04-22',
                  name: 'Reviewed preprint posted',
                  eventDescription: '(this version)',
                },
              ],
            },
            version: 1,
          },
        },
      }, '10.1101/existing', '11111');

      expect(manuscripts).toStrictEqual({
        11111: '11111v2',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-23',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v2',
                },
                name: 'Reviewed preprint version 2',
              },
              {
                date: '2023-04-22',
                name: 'Reviewed preprint version 1',
                eventDescription: '(this version)',
              },
            ],
          },
          version: 1,
        },
        '11111v2': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Revised by authors after peer review.',
            timeline: [
              {
                date: '2023-04-23',
                name: 'Reviewed preprint version 2',
                eventDescription: '(this version)',
              },
              {
                date: '2023-04-22',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v1',
                },
                name: 'Reviewed preprint version 1',
              },
            ],
          },
          version: 2,
        },
      });
    });

    it('manuscripts existing - match - minimal version 3', () => {
      const { manuscripts } = addManuscript({
        preprints: {},
        manuscripts: {
          11111: '11111v2',
          '11111v1': {
            msid: '11111',
            preprintDoi: '10.1101/existing',
            publishedYear: 2023,
            status: {
              articleType: 'Reviewed Preprint',
              status: 'Published from the original preprint after peer review and assessment by eLife.',
              timeline: [
                {
                  date: '2023-04-22',
                  link: {
                    text: 'Go to version',
                    url: '/reviewed-preprints/11111v2',
                  },
                  name: 'Reviewed preprint version 2',
                },
                {
                  date: '2023-04-21',
                  name: 'Reviewed preprint version 1',
                  eventDescription: '(this version)',
                },
              ],
            },
            version: 1,
          },
          '11111v2': {
            msid: '11111',
            preprintDoi: '10.1101/existing',
            publishedYear: 2023,
            status: {
              articleType: 'Reviewed Preprint',
              status: 'Revised by authors after peer review.',
              timeline: [
                {
                  date: '2023-04-23',
                  name: 'Reviewed preprint version 2',
                  eventDescription: '(this version)',
                },
                {
                  date: '2023-04-21',
                  link: {
                    text: 'Go to version',
                    url: '/reviewed-preprints/11111v1',
                  },
                  name: 'Reviewed preprint version 1',
                },
              ],
            },
            version: 2,
          },
        },
      }, '10.1101/existing', '11111');

      expect(manuscripts).toStrictEqual({
        11111: '11111v3',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-23',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v3',
                },
                name: 'Reviewed preprint version 3',
              },
              {
                date: '2023-04-22',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v2',
                },
                name: 'Reviewed preprint version 2',
              },
              {
                date: '2023-04-21',
                name: 'Reviewed preprint version 1',
                eventDescription: '(this version)',
              },
            ],
          },
          version: 1,
        },
        '11111v2': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Revised by authors after peer review.',
            timeline: [
              {
                date: '2023-04-23',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v3',
                },
                name: 'Reviewed preprint version 3',
              },
              {
                date: '2023-04-22',
                name: 'Reviewed preprint version 2',
                eventDescription: '(this version)',
              },
              {
                date: '2023-04-21',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v1',
                },
                name: 'Reviewed preprint version 1',
              },
            ],
          },
          version: 2,
        },
        '11111v3': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Revised by authors after peer review.',
            timeline: [
              {
                date: '2023-04-23',
                name: 'Reviewed preprint version 3',
                eventDescription: '(this version)',
              },
              {
                date: '2023-04-22',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v2',
                },
                name: 'Reviewed preprint version 2',
              },
              {
                date: '2023-04-21',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v1',
                },
                name: 'Reviewed preprint version 1',
              },
            ],
          },
          version: 3,
        },
      });
    });

    it('manuscripts existing - match - minimal version 2 - different preprint doi', () => {
      const { preprints, manuscripts } = addManuscript({
        preprints: {
          '10.1101/existing': {
            preprintDoi: '10.1101/existing',
            msas: [
              'Biochemistry and Chemical Biology',
            ],
          },
        },
        manuscripts: {
          11111: '11111v1',
          '11111v1': {
            msid: '11111',
            preprintDoi: '10.1101/existing',
            publishedYear: 2023,
            status: {
              articleType: 'Reviewed Preprint',
              status: 'Published from the original preprint after peer review and assessment by eLife.',
              timeline: [
                {
                  date: '2023-04-22',
                  name: 'Reviewed preprint posted',
                  eventDescription: '(this version)',
                },
              ],
            },
            version: 1,
          },
        },
      }, '10.1101/different', '11111', ['Cancer Biology']);

      expect(preprints).toStrictEqual({
        '10.1101/existing': {
          preprintDoi: '10.1101/existing',
          msas: [
            'Biochemistry and Chemical Biology',
          ],
        },
        '10.1101/different': {
          preprintDoi: '10.1101/different',
          msas: [
            'Cancer Biology',
          ],
        },
      });

      expect(manuscripts).toStrictEqual({
        11111: '11111v2',
        '11111v1': {
          msid: '11111',
          preprintDoi: '10.1101/existing',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Published from the original preprint after peer review and assessment by eLife.',
            timeline: [
              {
                date: '2023-04-23',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v2',
                },
                name: 'Reviewed preprint version 2',
              },
              {
                date: '2023-04-22',
                name: 'Reviewed preprint version 1',
                eventDescription: '(this version)',
              },
            ],
          },
          version: 1,
        },
        '11111v2': {
          msid: '11111',
          preprintDoi: '10.1101/different',
          publishedYear: 2023,
          status: {
            articleType: 'Reviewed Preprint',
            status: 'Revised by authors after peer review.',
            timeline: [
              {
                date: '2023-04-23',
                name: 'Reviewed preprint version 2',
                eventDescription: '(this version)',
              },
              {
                date: '2023-04-22',
                link: {
                  text: 'Go to version',
                  url: '/reviewed-preprints/11111v1',
                },
                name: 'Reviewed preprint version 1',
              },
            ],
          },
          version: 2,
        },
      });
    });
  });
});
