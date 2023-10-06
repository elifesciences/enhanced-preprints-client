/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Descriptors } from './descriptors';

const doi = '10.1101/24601';

describe('Descriptors', () => {
  afterEach(cleanup);
  test('should render correctly with the doi', () => {
    render(<Descriptors doi={doi}/>);

    expect(screen.getByText(`https://doi.org/${doi}`)).toBeTruthy();
  });

  test('should have the doi, open access, and license links', () => {
    render(<Descriptors doi={doi}/>);

    expect(screen.getByText(`https://doi.org/${doi}`).getAttribute('href')).toStrictEqual('https://doi.org/10.1101/24601');
    expect(screen.getByText('Open access').parentElement?.getAttribute('href')).toStrictEqual('https://en.wikipedia.org/wiki/Open_access');
    expect(screen.getByText('Copyright information').parentElement?.getAttribute('href')).toStrictEqual('https://creativecommons.org/licenses/by/4.0/');
  });

  test('should hide the icon descriptions', () => {
    render(<Descriptors doi={doi}/>);

    expect(Array.from(screen.getByText('Open access').classList)).toContain('visuallyhidden');
    expect(Array.from(screen.getByText('Copyright information').classList)).toContain('visuallyhidden');
  });
});
