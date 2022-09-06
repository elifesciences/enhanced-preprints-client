import { render, screen } from '@testing-library/react';
import { ContentHeader } from './content-header';

describe('ContentHeader', () => {
  it('render the Content Header with all of the props passed in', () => {
    render(
      <ContentHeader
        msas={['msa1', 'msa2']}
        importance={'important'}
        strengthOfEvidence={'strong'}
        authors={[
          { givenNames: ['Joe'], familyNames: ['Blogs'] },
        ]}
        doi={'10.1101/123456'}
        title={'title'}/>,
    );

    expect(screen.getByText('msa1')).toBeInTheDocument();
    expect(screen.getByText('msa2')).toBeInTheDocument();
    expect(screen.getByText('important')).toBeInTheDocument();
    expect(screen.getByText('strong')).toBeInTheDocument();
    expect(screen.getByText('Joe Blogs')).toBeInTheDocument();
    expect(screen.getByText('https://doi.org/10.1101/123456')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
