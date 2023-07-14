const todayDate = () => (new Date()).toISOString().split('T')[0];
const sortTimelines = (a: Timeline, b: Timeline) => (new Date(b.date).getTime() - new Date(a.date).getTime());

const validateMsas = (msas: string[]) => {
  const valid = [
    'Biochemistry and Chemical Biology',
    'Cancer Biology',
    'Cell Biology',
    'Chromosomes and Gene Expression',
    'Computational and Systems Biology',
    'Developmental Biology',
    'Ecology',
    'Epidemiology and Global Health',
    'Evolutionary Biology',
    'Genetics and Genomics',
    'Immunology and Inflammation',
    'Medicine',
    'Microbiology and Infectious Disease',
    'Neuroscience',
    'Physics of Living Systems',
    'Plant Biology',
    'Structural Biology and Molecular Biophysics',
    'Stem Cells and Regenerative Medicine',
  ];

  const unrecognised = msas.filter((msa) => !valid.includes(msa));

  if (unrecognised.length > 0) {
    throw new Error(`msa not recognised: ${unrecognised.join(', ')}`);
  }

  return true;
};

type Preprint = {
  preprintDoi: string;
  msas?: string[];
};

type Preprints = {
  [preprintDoi: string]: Preprint;
};

type TimelineBase = {
  name: string;
  date: string;
};

type Timeline = TimelineBase & {
  link: {
    url: string;
    text: string;
  }
} | TimelineBase & {
  eventDescription: string;
} | TimelineBase & {};

type Manuscript = {
  msid: string;
  version: number;
  publishedYear: number;
  preprintDoi: string;
  status: {
    articleType: string;
    status: string;
    timeline: Timeline[];
  };
  pdfUrl?: string;
};

type Manuscripts = {
  [msidVersion: string]: Manuscript | string;
};

type PreprintManuscripts = {
  preprints: Preprints,
  manuscripts: Manuscripts,
};

const addManuscript = (preprintManuscripts: PreprintManuscripts, ppDoi: string, rpMsid: string, ppMsa?: string[], ppServer?: string, ppDate?: string, ppUrl?: string, rpDate?: string, prDate?: string) : PreprintManuscripts => {
  const preprintServer: string = (ppServer && ppServer.trim() !== '') ? ppServer.trim() : 'bioRxiv';
  const dateReviewedPreprint: string = (rpDate && rpDate.trim() !== '') ? rpDate.trim() : todayDate();

  const newMsas = (ppMsa === undefined || ppMsa.length === 0) && ppDoi in preprintManuscripts.preprints ? preprintManuscripts.preprints[ppDoi].msas : ppMsa;

  validateMsas(newMsas ?? []);

  const newPreprints: Preprints = {
    [ppDoi]: {
      preprintDoi: ppDoi,
      ...((newMsas ?? []).length > 0 ? { msas: newMsas } : {}),
    },
  };

  const rpMsidRoot = `${rpMsid}v`;
  const v = Object.keys(preprintManuscripts.manuscripts).filter((id) => id.startsWith(rpMsidRoot)).length + 1;
  const allVersions: Manuscript[] = Object.keys(preprintManuscripts.manuscripts)
    .filter((k) => k.startsWith(rpMsidRoot) && preprintManuscripts && typeof preprintManuscripts.manuscripts[k] !== undefined && typeof preprintManuscripts.manuscripts[k] !== 'string')
    .map((k) => preprintManuscripts.manuscripts[k] as Manuscript);

  const newTimeline: Timeline[] = [
    { name: 'Reviewed preprint posted', date: dateReviewedPreprint, eventDescription: '(this version)' },
  ];

  if (ppDate && ppUrl) {
    newTimeline.push({ name: `Posted to ${preprintServer}`, date: ppDate, link: { url: ppUrl, text: `Go to ${preprintServer}` } });
  }
  if (prDate) {
    newTimeline.push({ name: 'Sent for peer review', date: prDate });
  }

  allVersions.push({
    msid: rpMsid,
    version: v,
    publishedYear: Number(dateReviewedPreprint.split('-')[0]),
    preprintDoi: ppDoi,
    status: {
      articleType: 'Reviewed Preprint',
      status: v === 1 ? 'Published from the original preprint after peer review and assessment by eLife.' : 'Revised by authors after peer review.',
      timeline: v === 1 ? newTimeline.sort(sortTimelines) : [newTimeline[0], ...allVersions[allVersions.length - 1].status.timeline],
    },
  });

  const currentTimeline = allVersions[allVersions.length - 1].status.timeline;

  const newManuscripts: Manuscripts = {
    [rpMsid]: `${rpMsidRoot}${v}`,
  };

  if (v > 1) {
    const reviewedPreprintsPosted = allVersions[0].status.timeline.filter((t) => t.name.startsWith('Reviewed '));
    reviewedPreprintsPosted.unshift(currentTimeline[0]);
    const sortPosted = reviewedPreprintsPosted.sort(sortTimelines);
    const prepPosted: Timeline[] = [];
    for (let i = 0; i < sortPosted.length; i += 1) {
      prepPosted.push({
        name: `Reviewed preprint version ${v - i}`,
        date: sortPosted[i].date,
      });
    }

    const prepTimelines: Timeline[][] = allVersions
      .map((m, i) => [
        ...prepPosted.map((p, j) => ({ ...p, ...(v - i - 1 === j ? { eventDescription: '(this version)' } : { link: { url: `/reviewed-preprints/${rpMsidRoot}${v - j}`, text: 'Go to version' } }) })),
        ...m.status.timeline.filter((t) => !t.name.startsWith('Reviewed ')),
      ]);

    allVersions.forEach((mv, i) => {
      newManuscripts[`${mv.msid}v${mv.version}`] = {
        ...mv,
        status: {
          ...mv.status,
          timeline: prepTimelines[i],
        },
      };
    });
  } else {
    // eslint-disable-next-line prefer-destructuring
    newManuscripts[`${rpMsidRoot}${v}`] = allVersions[0];
  }

  return {
    preprints: { ...preprintManuscripts.preprints, ...newPreprints },
    manuscripts: { ...preprintManuscripts.manuscripts, ...newManuscripts },
  };
};

export {
  addManuscript,
};
