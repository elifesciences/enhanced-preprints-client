import { render, screen } from '@testing-library/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';

describe('Reference', () => {
  it('should render all the references passed in as a prop', () => {
    render(<Reference reference={references[0]} isReferenceList={true} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeInTheDocument();
    expect(screen.getByText('Afshari FS')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
    expect(screen.getByText('J. Neurophysiol')).toBeInTheDocument();
    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.id).toStrictEqual('c1');
  });
});
