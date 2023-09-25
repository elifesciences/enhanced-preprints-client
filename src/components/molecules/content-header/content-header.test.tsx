import { render, screen } from '@testing-library/react';
import { ContentHeader } from './content-header';

describe('ContentHeader', () => {
  it('render the Content Header with all of the props passed in', () => {
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
        title={'title'}
        license={'license'} />,
    );

    expect(screen.getByText('msa1')).toBeInTheDocument();
    expect(screen.getByText('msa2')).toBeInTheDocument();
    expect(screen.getByText('Jean Gray')).toBeInTheDocument();
    expect(screen.getByText('X-Men')).toBeInTheDocument();
    expect(screen.getByText('https://doi.org/10.1101/123456')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('Copyright information').parentElement).toHaveAttribute('href');
    expect(screen.getByText('Copyright information').parentElement?.getAttribute('href')).toStrictEqual('license');
  });
});
