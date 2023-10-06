/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ContentHeader } from './content-header';

describe('ContentHeader', () => {
  afterEach(cleanup);
  test('render the Content Header with all of the props passed in', () => {
    render(
      <ContentHeader
        msas={['msa1', 'msa2']}
        authors={[
          {
            givenNames: ['Jean'],
            familyNames: ['Gray'],
            affiliations: [
              { name: 'X-Men', address: { addressCountry: 'West Chester' } },
            ],
          },
        ]}
        doi={'10.1101/123456'}
        title={'title'}/>,
    );

    expect(screen.getByText('msa1')).toBeTruthy();
    expect(screen.getByText('msa2')).toBeTruthy();
    expect(screen.getByText('Jean Gray')).toBeTruthy();
    expect(screen.getByText('X-Men')).toBeTruthy();
    expect(screen.getByText('https://doi.org/10.1101/123456')).toBeTruthy();
    expect(screen.getByText('title')).toBeTruthy();
  });
});
