import { render, screen } from '@testing-library/react';
import { ReferenceList } from './reference-list';
import { references } from '../../../utils/mocks';

describe('ReferenceList', () => {
  it('should render all the references passed in as a prop', () => {
    render(<ReferenceList references={references} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeInTheDocument();
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease')).toBeInTheDocument();
    expect(screen.getByText('The Theory of Everything')).toBeInTheDocument();

    expect(screen.getByText('Afshari FS')).toBeInTheDocument();
    expect(screen.getByText('Agopian J')).toBeInTheDocument();
    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();

    expect(screen.getByText('2004')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();

    expect(screen.getByText('Int J Mol Sci')).toBeInTheDocument();
    expect(screen.getByText('J. Neurophysiol')).toBeInTheDocument();
    expect(screen.getByText('Jounal of Neurology')).toBeInTheDocument();

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.id).toStrictEqual('c1');
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease').parentElement?.id).toStrictEqual('c2');
    expect(screen.getByText('The Theory of Everything').parentElement?.id).toStrictEqual('c3');
  });
});
