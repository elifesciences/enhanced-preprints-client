import { ArticleFlag } from '../../atoms/article-flag/article-flag';
import './article-flag-list.scss';

export type Props = {
  msas: string[],
};

export type Subject = {
  id: string,
  name: string,
};

const msaNames: Record<string, string> = {
  'Biochemistry and Chemical Biology': 'biochemistry-chemical-biology',
  'Cancer Biology': 'cancer-biology',
  'Cell Biology': 'cell-biology',
  'Chromosomes and Gene Expression': 'chromosomes-gene-expression',
  'Computational and Systems Biology': 'computational-systems-biology',
  'Developmental Biology': 'developmental-biology',
  Ecology: 'ecology',
  'Epidemiology and Global Health': 'epidemiology-global-health',
  'Evolutionary Biology': 'evolutionary-biology',
  'Genetics and Genomics': 'genetics-genomics',
  'Immunology and Inflammation': 'immunology-inflammation',
  Medicine: 'medicine',
  'Microbiology and Infectious Disease': 'microbiology-infectious-disease',
  Neuroscience: 'neuroscience',
  'Physics of Living Systems': 'physics-living-systems',
  'Plant Biology': 'plant-biology',
  'Stem Cells and Regenerative Medicine': 'stem-cells-regenerative-medicine',
  'Structural Biology and Molecular Biophysics': 'structural-biology-molecular-biophysics',
};

const msaURLs: Record<string, string> = Object.fromEntries(Object.entries(msaNames).map(([name, id]) => [name, `https://elifesciences.org/subjects/${id}`]));

export const ArticleFlagList = ({ msas }: Props) => {
  if (msas.length === 0) {
    return <></>;
  }

  const msasWithURLS = msas.map((msa) => ({ msa, url: msaURLs[msa] }));

  return (
    <ul className="article-flag-list">
      {msasWithURLS.map(({ msa, url }, index) => (
        <li className="article-flag-list__item" key={index}>
          <ArticleFlag flagText={msa} url={url}/>
        </li>))}
    </ul>
  );
};

export const getSubjects = (subjectNames: string[]) : Subject[] => subjectNames.map((subjectName) => ({
  id: msaNames[subjectName],
  name: subjectName,
}));
