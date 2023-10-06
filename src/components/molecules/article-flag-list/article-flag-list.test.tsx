/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ArticleFlagList, getSubjects } from './article-flag-list';

const msas = [
  'Mad Science',
  'Alchemy',
];

describe('ArticleFlagList', () => {
  afterEach(cleanup);
  test('should render with all of the props', () => {
    render(<ArticleFlagList msas={msas}/>);

    expect(screen.getByText(msas[0])).toBeTruthy();
    expect(screen.getByText(msas[1])).toBeTruthy();
  });

  test('should render no items with an empty array', () => {
    render(<ArticleFlagList msas={[]}/>);

    expect(document.querySelector('.article-flag-list')).toBeNull();
  });

  test('should correctly pass in the msa flag', () => {
    render(<ArticleFlagList msas={msas}/>);

    expect(Array.from(screen.getByText(msas[0]).classList)).toContain('article-flag__link');
    expect(Array.from(screen.getByText(msas[1]).classList)).toContain('article-flag__link');
  });

  test('should use the corresponding url for an eLife msa', () => {
    render(<ArticleFlagList msas={[...msas, 'Neuroscience']}/>);

    const resultMsa = screen.getByText('Neuroscience');
    expect(resultMsa).toBeTruthy();
    expect(resultMsa.getAttribute('href')).toStrictEqual('https://elifesciences.org/subjects/neuroscience');
  });
});

describe('getSubjects', () => {
  afterEach(cleanup);
  test('should return subject list', () => {
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
