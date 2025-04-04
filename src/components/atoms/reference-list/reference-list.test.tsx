import { render, screen } from '@testing-library/react';
import { ReferenceList } from './reference-list';
import { references } from '../../../utils/mocks';
import '../../../i18n';

describe('ReferenceList', () => {
  it('should render all the references passed in as a prop', () => {
    render(<ReferenceList references={references} />);

    expect(document.querySelectorAll('.reference-list__item')).toHaveLength(5);
    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeInTheDocument();
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease')).toBeInTheDocument();
    expect(screen.getByText('The Theory of Everything')).toBeInTheDocument();

    expect(screen.getByText('Afshari FS')).toBeInTheDocument();
    expect(screen.getByText('Agopian J')).toBeInTheDocument();
    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();

    expect(screen.getByText('2019a')).toBeInTheDocument();
    expect(screen.getByText('2019b')).toBeInTheDocument();
    expect(screen.getByText('2019c')).toBeInTheDocument();

    expect(screen.getByText('Int J Mol Sci')).toBeInTheDocument();
    expect(screen.getByText('J. Neurophysiol')).toBeInTheDocument();
    expect(screen.getByText('Journal of Neurology')).toBeInTheDocument();

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.parentElement?.id).toStrictEqual('c1');
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease').parentElement?.parentElement?.id).toStrictEqual('c2');
    expect(screen.getByText('The Theory of Everything').parentElement?.parentElement?.id).toStrictEqual('c3');
  });
});
