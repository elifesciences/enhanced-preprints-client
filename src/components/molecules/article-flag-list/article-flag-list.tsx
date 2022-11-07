import { ArticleFlag } from '../../atoms/article-flag/article-flag';
import styles from './article-flag-list.module.scss';

export type Props = {
  msas: string[],
};

export type SubjectItem = {
  id: string,
  name: string,
};

const msaURLs: Record<string, string> = {
  'Biochemistry and Chemical Biology': 'https://elifesciences.org/subjects/biochemistry-chemical-biology',
  'Cancer Biology': 'https://elifesciences.org/subjects/cancer-biology',
  'Cell Biology': 'https://elifesciences.org/subjects/cell-biology',
  'Chromosomes and Gene Expression': 'https://elifesciences.org/subjects/chromosomes-gene-expression',
  'Computational and Systems Biology': 'https://elifesciences.org/subjects/computational-systems-biology',
  'Developmental Biology': 'https://elifesciences.org/subjects/developmental-biology',
  // eslint-disable-next-line quote-props
  'Ecology': 'https://elifesciences.org/subjects/ecology',
  'Epidemiology and Global Health': 'https://elifesciences.org/subjects/epidemiology-global-health',
  'Evolutionary Biology': 'https://elifesciences.org/subjects/evolutionary-biology',
  'Genetics and Genomics': 'https://elifesciences.org/subjects/genetics-genomics',
  'Immunology and Inflammation': 'https://elifesciences.org/subjects/immunology-inflammation',
  // eslint-disable-next-line quote-props
  'Medicine': 'https://elifesciences.org/subjects/medicine',
  'Microbiology and Infectious Disease': 'https://elifesciences.org/subjects/microbiology-infectious-disease',
  // eslint-disable-next-line quote-props
  'Neuroscience': 'https://elifesciences.org/subjects/neuroscience',
  'Physics of Living Systems': 'https://elifesciences.org/subjects/physics-living-systems',
  'Plant Biology': 'https://elifesciences.org/subjects/plant-biology',
  'Stem Cells and Regenerative Medicine': 'https://elifesciences.org/subjects/stem-cells-regenerative-medicine',
  'Structural Biology and Molecular Biophysics': 'https://elifesciences.org/subjects/structural-biology-molecular-biophysics',
};

export const ArticleFlagList = ({ msas }: Props): JSX.Element => {
  const msasWithURLS = msas.map((msa) => ({ msa, url: msaURLs[msa] }));

  return (
    <ul className={styles['article-flag-list']}>
      {msasWithURLS.map(({ msa, url }, index) => (
        <li className={styles['article-flag-list__item']} key={index}>
          <ArticleFlag flagText={msa} url={url}/>
        </li>))}
    </ul>
  );
};

export const SubjectList = ({ msas }: Props): Array<SubjectItem> => {
  return msas.map(msa => ({
    id: msaURLs[msa].substring(msaURLs[msa].lastIndexOf('/') + 1),
    name: msa,
  }));
};
