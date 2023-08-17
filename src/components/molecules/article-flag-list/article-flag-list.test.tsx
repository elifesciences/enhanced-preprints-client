import { render, screen } from '@testing-library/react';
import { ArticleFlagList, getSubjects } from './article-flag-list';

const msas = [
  'Mad Science',
  'Alchemy',
];

describe('ArticleFlagList', () => {
  it('should render with all of the props', () => {
    render(<ArticleFlagList msas={msas}/>);

    expect(screen.getByText(msas[0])).toBeInTheDocument();
    expect(screen.getByText(msas[1])).toBeInTheDocument();
  });

  it('should render no items with an empty array', () => {
    render(<ArticleFlagList msas={[]}/>);

    expect(document.querySelector('.article-flag-list')).not.toBeInTheDocument();
  });

  it('should correctly pass in the msa flag', () => {
    render(<ArticleFlagList msas={msas}/>);

    expect(screen.getByText(msas[0])).toHaveClass('article-flag__link');
    expect(screen.getByText(msas[1])).toHaveClass('article-flag__link');
  });

  it('should use the corresponding url for an eLife msa', () => {
    render(<ArticleFlagList msas={[...msas, 'Neuroscience']}/>);

    const resultMsa = screen.getByText('Neuroscience');
    expect(resultMsa).toBeInTheDocument();
    expect(resultMsa).toHaveAttribute('href', 'https://elifesciences.org/subjects/neuroscience');
  });
});

describe('getSubjects', () => {
  it('should return subject list', () => {
    const results = getSubjects(['Neuroscience', 'Genetics and Genomics', 'Structural Biology and Molecular Biophysics']);

    expect(results).toStrictEqual([
      {
        id: 'neuroscience',
        name: 'Neuroscience',
      },
      {
        id: 'genetics-genomics',
        name: 'Genetics and Genomics',
      },
      {
        id: 'structural-biology-molecular-biophysics',
        name: 'Structural Biology and Molecular Biophysics',
      },
    ]);
  });
});
