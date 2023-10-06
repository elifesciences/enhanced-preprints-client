/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Reference } from './reference';
import { references } from '../../../utils/mocks';

describe('Reference', () => {
  afterEach(cleanup);
  test('should render all the references passed in as a prop', () => {
    render(<Reference reference={references[0]} isReferenceList={false} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeTruthy();
    expect(screen.getByText('Afshari FS')).toBeTruthy();
    expect(screen.getByText('2004')).toBeTruthy();
    expect(screen.getByText('J. Neurophysiol')).toBeTruthy();
    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.id).toStrictEqual('c1');
    expect(screen.getByText('2843', { exact: false })).toBeTruthy();
  });

  test('should be wrapped in a div if isReferenceList is false', () => {
    render(<Reference reference={references[0]} isReferenceList={false} />);

    expect(screen.getByText(references[0].title).parentElement?.tagName).toStrictEqual('DIV');
  });

  test('should not render the label if the reference has one', () => {
    render(<Reference reference={references[0]} isReferenceList={false} />);

    expect(screen.queryByText('1.')).toBeNull();
  });

  test('should not render an end page if the start page is undefined', () => {
    render(<Reference reference={{ ...references[0], pageStart: undefined }} isReferenceList={false} />);

    expect(screen.queryByText('2843', { exact: false })).toBeNull();
  });

  test('renders the name when an organisation is the author', () => {
    render(<Reference reference={references[2]} isReferenceList={false} />);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeTruthy();
  });

  describe('inside a reference list', () => {
    test('should be wrapped in an li if isReferenceList is true', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText(references[0].title).parentElement?.tagName).toStrictEqual('LI');
    });

    test('should wrap doi in link if isReferenceList is true', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText('https://doi.org/', { exact: false }).tagName).toStrictEqual('A');
      expect(screen.getByText('https://doi.org/', { exact: false }).getAttribute('href')).toStrictEqual('https://doi.org/10.7554/eLife.16135');
    });

    test('should render the label if the reference has one', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText('1.')).toBeTruthy();
    });

    test('should render the reference name correctly if givenNames is undefined', () => {
      render(<Reference reference={references[0]} isReferenceList={true} />);

      expect(screen.getByText('NoGiven').textContent).toStrictEqual('NoGiven');
    });
  });
});
