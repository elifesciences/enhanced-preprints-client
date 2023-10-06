/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { afterEach, expect, test, describe } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  afterEach(cleanup);

  test('renders with the provided text', () => {
    render(<Button text='button text' url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeTruthy();
    expect(screen.getByText('button text').getAttribute('href')).not.toBeNull();
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });

  test('renders with the provided text and iconName', () => {
    render(<Button text='button text' iconName='download' url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeTruthy();
    expect(Array.from(screen.getByText('button text').classList)).toContain('button--icon-download');
    expect(screen.getByText('button text').getAttribute('href')).not.toBeNull();
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });

  test('renders with the provided text, iconName and variant', () => {
    render(<Button text='button text' iconName='follow' variant='action' url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeTruthy();
    expect(Array.from(screen.getByText('button text').classList)).toContain('button--icon-follow');
    expect(Array.from(screen.getByText('button text').classList)).toContain('button--action');
    expect(screen.getByText('button text').getAttribute('href')).not.toBeNull();
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });
});
