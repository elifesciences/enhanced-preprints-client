import { render, screen } from '@testing-library/react';
import { ReviewContent } from './review-content';
import '../../../i18n';

describe('ReviewContent', () => {
  it('renders with a simple string content', async () => {
    render(<ReviewContent content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
  });

  it('renders with a complex html', async () => {
    render(<ReviewContent content={`<h1>A title</h1>

<em>I am an em<em>`}/>);

    expect(screen.getByText('A title')).toBeInTheDocument();
    expect(screen.getByText('A title').tagName).toStrictEqual('H1');

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it.failing('adds https://proxy.duckduckgo.com/iu/?u= prefix to https://i.imgur.com/ img uris', () => {
    const { container } = render(<ReviewContent content={'<p><a href="https://imgur.com/wiUoXWs"><img src="https://i.imgur.com/wiUoXWs.jpg" title="source: imgur.com" /></a></p>'}/>);

    expect(container.querySelector('img[src="https://proxy.duckduckgo.com/iu/?u=https://i.imgur.com/wiUoXWs.jpg"]')).toBeInTheDocument();
  });
});
