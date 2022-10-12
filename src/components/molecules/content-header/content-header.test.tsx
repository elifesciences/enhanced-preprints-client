import { render, screen } from '@testing-library/react';
import { ContentHeader } from './content-header';

describe('ContentHeader', () => {
  it('render the Content Header with all of the props passed in', () => {
    render(
      <ContentHeader
        msas={['msa1', 'msa2']}
        authors={[
          { givenNames: ['Joe'], familyNames: ['Blogs'] },
        ]}
        institutions={[
          { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
        ]}
        doi={'10.1101/123456'}
        title={'title'}/>,
    );

    expect(screen.getByText('msa1')).toBeInTheDocument();
    expect(screen.getByText('msa2')).toBeInTheDocument();
    expect(screen.getByText('Joe Blogs')).toBeInTheDocument();
    expect(screen.getByText('Charles Xavier\'s School for Gifted Youngsters')).toBeInTheDocument();
    expect(screen.getByText('https://doi.org/10.1101/123456')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
