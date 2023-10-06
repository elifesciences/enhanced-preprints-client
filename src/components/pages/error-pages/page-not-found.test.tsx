/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from '../../atoms/button/button';

describe('Back to homepage button', () => {
  afterEach(cleanup);
  test('renders with the provided text', () => {
    render(<Button text="Back to homepage" url='/' />);

    expect(screen.getByText('Back to homepage')).toBeTruthy();
    expect(screen.getByText('Back to homepage').getAttribute('href')).toBeTruthy();
    expect(screen.getByText('Back to homepage').getAttribute('href')).toStrictEqual('/');
  });
});
