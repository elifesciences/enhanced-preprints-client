import { render, screen } from '@testing-library/react';
import { Descriptors } from './descriptors';

const doi = '10.1101/24601';

describe('Descriptors', () => {
  it('should render correctly with the doi', () => {
    render(<Descriptors doi={doi}/>);

    expect(screen.getByText(`https://doi.org/${doi}`)).toBeInTheDocument();
  });

  it('should have the doi, open access, and license links', () => {
    render(<Descriptors doi={doi}/>);

    expect(screen.getByText(`https://doi.org/${doi}`)).toHaveAttribute('href', 'https://doi.org/10.1101/24601');
    expect(screen.getByText('Open access').parentElement).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Open_access');
    expect(screen.getByText('Copyright information').parentElement).toHaveAttribute('href', 'https://creativecommons.org/licenses/by/4.0/');
  });

  it('should hide the icon descriptions', () => {
    render(<Descriptors doi={doi}/>);

    expect(screen.getByText('Open access')).toHaveClass('visuallyhidden');
    expect(screen.getByText('Copyright information')).toHaveClass('visuallyhidden');
  });
});
