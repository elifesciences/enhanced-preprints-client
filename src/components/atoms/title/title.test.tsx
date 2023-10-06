/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Title } from './title';
import { Content } from '../../../types';

describe('Title', () => {
  afterEach(cleanup);
  test('should render the title with a string passed into the title prop', () => {
    const title = 'This is a title';
    render(<Title title={title}/>);

    expect(screen.getByText(title)).toBeTruthy();
  });

  test('should render the title with a array of strings passed into the title prop', () => { // whitespace issues
    const titles: Content = ['This', 'is', 'a', 'title'];
    render(<Title title={titles}/>);

    expect(screen.getByText('Thisisatitle')).toBeTruthy();
  });

  test('should render the title with a single content part passed into the title prop', () => {
    const title: Content = { type: 'Strong', content: 'This is a title' };
    render(<Title title={title}/>);

    expect(screen.getByText('This is a title')).toBeTruthy();
  });

  test('should render the title with an array of content parts passed into the title prop', () => { // whitespace issues
    const title: Content = [{ type: 'Strong', content: 'This is a' }, { type: 'Emphasis', content: 'title' }];
    render(<Title title={title}/>);

    expect(screen.getByText('This is a')).toBeTruthy();
    expect(screen.getByText('title')).toBeTruthy();
  });

  test('should render the title with an array of content parts and strings passed into the title prop', () => { // components in a list need a key
    const title: Content = [{ type: 'Strong', content: 'This is a' }, 'title'];
    render(<Title title={title}/>);

    expect(screen.getByText('This is a')).toBeTruthy();
    expect(screen.getByText('title')).toBeTruthy();
  });

  test('should render the title with a nested string array in a content part passed into the title prop', () => { // components in a list need a key
    const title: Content = [{ type: 'Strong', content: ['This', 'is', 'a', 'title'] }];
    render(<Title title={title}/>);

    expect(screen.getByText('Thisisatitle')).toBeTruthy();
  });

  test('should render the title with a doubly nested content part passed into the title prop', () => { // components in a list need a key
    const title: Content = [{ type: 'Strong', content: { type: 'Emphasis', content: 'This is a title' } }];
    render(<Title title={title}/>);
    const titleElement = screen.getByText('This is a title');

    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toStrictEqual('EM');
    expect(titleElement.parentElement?.tagName).toStrictEqual('STRONG');
  });
});
