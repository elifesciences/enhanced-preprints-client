import { render, screen } from '@testing-library/react';
import { Abstract } from './abstract';

describe('ArticleContent', () => {
  it('renders with a simple string content', async () => {
    render(<Abstract content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
    expect(screen.getByText('I am an article').tagName).toStrictEqual('SECTION');
  });

  it('renders with a complex content', async () => {
    render(<Abstract content={{ type: 'Emphasis', content: 'I am an em' }}/>);

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it('renders with an array content', async () => {
    render(<Abstract content={['I ', 'am ', 'an ', 'array ']}/>);
    expect(screen.getByText('I am an array', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('I am an array').tagName).toStrictEqual('SECTION');
  });
});
