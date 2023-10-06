/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Heading } from './heading';

describe('Heading', () => {
  afterEach(cleanup);
  test('should render all of the different heading levels with the correct tag', () => {
    render(
      <div>
        <Heading id={'foo1'} content='heading-1' headingLevel={1}/>
        <Heading id={'foo2'} content='heading-2' headingLevel={2}/>
        <Heading id={'foo3'} content='heading-3' headingLevel={3}/>
        <Heading id={'foo4'} content='heading-4' headingLevel={4}/>
        <Heading id={'foo5'} content='heading-5' headingLevel={5}/>
        <Heading id={'foo6'} content='heading-6' headingLevel={6}/>
      </div>,
    );

    expect(screen.getByText('heading-1').tagName).toStrictEqual('H1');
    expect(screen.getByText('heading-2').tagName).toStrictEqual('H2');
    expect(screen.getByText('heading-3').tagName).toStrictEqual('H3');
    expect(screen.getByText('heading-4').tagName).toStrictEqual('H4');
    expect(screen.getByText('heading-5').tagName).toStrictEqual('H5');
    expect(screen.getByText('heading-6').tagName).toStrictEqual('H6');
  });

  test('should render a string content correctly', () => {
    render(<Heading id={'foo'} content="I am a string title" headingLevel={1}/>);

    expect(screen.getByText('I am a string title')).toBeTruthy();
  });

  test('should render a Content content correctly', () => {
    render(<Heading id={'foo'} content={{ content: 'I am an emphasised title', type: 'Emphasis' }} headingLevel={1}/>);

    expect(screen.getByText('I am an emphasised title')).toBeTruthy();
  });

  test('includes the heading id', () => {
    render(<Heading content={'heading'} headingLevel={1} id={'hd1'}/>);

    expect(screen.getByText('heading').id).toStrictEqual('hd1');
  });

  test('should render with a custom className if passed in', () => {
    render(<Heading id={'foo'} content="foo" headingLevel={1} className="custom-class"/>);

    expect(Array.from(screen.getByText('foo').classList)).toContain('custom-class');
    expect(Array.from(screen.getByText('foo').classList)).not.toContain('heading-1');
  });
});
