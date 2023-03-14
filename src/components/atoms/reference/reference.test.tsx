import { render, screen } from '@testing-library/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';

describe('Reference', () => {
  it('should render all the references passed in as a prop', () => {
    render(<Reference reference={references[0]} isReferenceList={false} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeInTheDocument();
    expect(screen.getByText('Afshari FS')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
    expect(screen.getByText('J. Neurophysiol')).toBeInTheDocument();
    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.id).toStrictEqual('c1');
  });

  it('should be wrapped in a div if isReferenceList is false', () => {
    render(<Reference reference={references[0]} isReferenceList={false} />);

    expect(screen.getByText(references[0].title).parentElement?.tagName).toStrictEqual('DIV');
  });

  it('should not render the label if the reference has one', () => {
    render(<Reference reference={references[0]} isReferenceList={false} />);

    expect(screen.queryByText('1.')).not.toBeInTheDocument();
  });

  describe('inside a reference list', () => {
    it('should be wrapped in an li if isReferenceList is true', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText(references[0].title).parentElement?.tagName).toStrictEqual('LI');
    });

    it('should wrap doi in link if isReferenceList is true', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText('https://doi.org/', { exact: false }).tagName).toStrictEqual('A');
      expect(screen.getByText('https://doi.org/', { exact: false })).toHaveAttribute('href', 'https://doi.org/10.7554/eLife.16135');
    });

    it('should render the label if the reference has one', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText('1.')).toBeInTheDocument();
    });
  })
});
