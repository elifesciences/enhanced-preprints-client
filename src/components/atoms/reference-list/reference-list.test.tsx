/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ReferenceList } from './reference-list';
import { references } from '../../../utils/mocks';

describe('ReferenceList', () => {
  afterEach(cleanup);
  test('should render all the references passed in as a prop', () => {
    render(<ReferenceList references={references} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeTruthy();
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease')).toBeTruthy();
    expect(screen.getByText('The Theory of Everything')).toBeTruthy();

    expect(screen.getByText('Afshari FS')).toBeTruthy();
    expect(screen.getByText('Agopian J')).toBeTruthy();
    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeTruthy();

    expect(screen.getByText('2004')).toBeTruthy();
    expect(screen.getByText('2020')).toBeTruthy();
    expect(screen.getByText('2021')).toBeTruthy();

    expect(screen.getByText('Int J Mol Sci')).toBeTruthy();
    expect(screen.getByText('J. Neurophysiol')).toBeTruthy();
    expect(screen.getByText('Jounal of Neurology')).toBeTruthy();

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.id).toStrictEqual('c1');
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease').parentElement?.id).toStrictEqual('c2');
    expect(screen.getByText('The Theory of Everything').parentElement?.id).toStrictEqual('c3');
  });
});
