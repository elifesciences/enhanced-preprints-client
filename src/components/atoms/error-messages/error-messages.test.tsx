/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ErrorMessages } from './error-messages';

describe('ErrorMessages', () => {
  afterEach(cleanup);
  test('should render the ErrorMessages component', () => {
    render(<ErrorMessages/>);

    expect(screen.getByText("We're looking into it")).toBeTruthy();
  });
});
