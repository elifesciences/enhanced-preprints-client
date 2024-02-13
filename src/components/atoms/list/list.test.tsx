import { render } from '@testing-library/react';
import { List } from './list';

describe('List', () => {
  it('renders with the provided item', () => {
    render(<List content={{
      type: 'List',
      order: 'Unordered',
      items: [
        {
          type: 'ListItem',
          content: 'foo',
        },
      ],
    }}/>);

    expect(document.querySelector('ul')).toBeInTheDocument();
    expect(document.querySelector('li')).toHaveTextContent('foo');
  });

  it('renders an unordered list when specified', () => {
    render(<List content={{
      type: 'List',
      order: 'Unordered',
      items: [],
    }}/>);

    expect(document.querySelector('ul')).toBeInTheDocument();
  });

  it('renders an ordered list when specified', () => {
    render(<List content={{
      type: 'List',
      order: 'Ascending',
      items: [],
    }}/>);

    expect(document.querySelector('ol')).toBeInTheDocument();
  });
});
