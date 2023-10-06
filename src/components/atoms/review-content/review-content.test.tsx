/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ReviewContent, terms } from './review-content';

describe('ArticleContent', () => {
  afterEach(cleanup);
  test('renders with a simple string content', async () => {
    render(<ReviewContent content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeTruthy();
  });

  test('renders with a complex html', async () => {
    render(<ReviewContent content={`<h1>A title</h1>

<em>I am an em<em>`}/>);

    expect(screen.getByText('A title')).toBeTruthy();
    expect(screen.getByText('A title').tagName).toStrictEqual('H1');

    expect(screen.getByText('I am an em')).toBeTruthy();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  test('highlights the terms within an assessment', async () => {
    render(<ReviewContent isAssessment={true} content="I am an important article that is very convincing dslfkjhas"/>);

    expect(screen.getByText('important')).toBeTruthy();
    expect(screen.getByText('important').tagName).toStrictEqual('STRONG');

    expect(screen.getByText('convincing')).toBeTruthy();
    expect(screen.getByText('convincing').tagName).toStrictEqual('STRONG');
  });

  test('highlights the terms within an assessment, regardless of case', async () => {
    render(<ReviewContent isAssessment={true} content="I am an ImPoRtAnt article that is very CONVINCING dslfkjhas"/>);

    expect(screen.getByText('ImPoRtAnt')).toBeTruthy();
    expect(screen.getByText('ImPoRtAnt').tagName).toStrictEqual('STRONG');

    expect(screen.getByText('CONVINCING')).toBeTruthy();
    expect(screen.getByText('CONVINCING').tagName).toStrictEqual('STRONG');
  });

  test.each(terms)('highlights the term: %s when review-content is an editors assessment', async (term) => {
    render(<ReviewContent isAssessment={true} content={`the term is ${term} and should be bold`}/>);

    expect(screen.getByText(term)).toBeTruthy();
    expect(screen.getByText(term).tagName).toStrictEqual('STRONG');
  });

  test('does not highlight terms unless term is exact', async () => {
    render(<ReviewContent isAssessment={true} content="I am an important article that is very convincingly good."/>);

    expect(screen.queryByText('convincing')).toBeNull();
  });

  test('shows links to explain assessment terms', async () => {
    render(<ReviewContent isAssessment={true} content="I have reviewed it, and it's good" peerReviewUrl="#"/>);

    expect(screen.getByText('Read the peer reviews')).toBeTruthy();
    expect(screen.getByText('About eLife assessments')).toBeTruthy();
  });
});
