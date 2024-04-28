import { render, screen } from '@testing-library/react';
import { ContextualData } from './contextual-data';

describe('ContextualData', () => {
  it('renders the properties passed in', () => {
    render(<ContextualData citations={2} downloads={5000} views={12345} />);

    expect(screen.getByText('citations', { exact: false }).textContent).toStrictEqual('2 citations');
    expect(screen.getByText('downloads', { exact: false }).textContent).toStrictEqual('5000 downloads');
    expect(screen.getByText('views', { exact: false }).textContent).toStrictEqual('12345 views');
  });

  it('renders the non plural data labels', () => {
    const { rerender } = render(<ContextualData citations={1} downloads={0} views={0} />);

    expect(screen.getByText('citation', { exact: false }).textContent).toStrictEqual('1 citation');
    expect(screen.getByText('download', { exact: false }).textContent).toStrictEqual('0 downloads');
    expect(screen.getByText('view', { exact: false }).textContent).toStrictEqual('0 views');

    rerender(<ContextualData citations={1} downloads={1} views={0} />);

    expect(screen.getByText('citation', { exact: false }).textContent).toStrictEqual('1 citation');
    expect(screen.getByText('download', { exact: false }).textContent).toStrictEqual('1 download');
    expect(screen.getByText('views', { exact: false }).textContent).toStrictEqual('0 views');

    rerender(<ContextualData citations={1} downloads={1} views={1} />);

    expect(screen.getByText('citation', { exact: false }).textContent).toStrictEqual('1 citation');
    expect(screen.getByText('download', { exact: false }).textContent).toStrictEqual('1 download');
    expect(screen.getByText('view', { exact: false }).textContent).toStrictEqual('1 view');
  });

  it('renders the correct zero data labels', () => {
    render(<ContextualData citations={0} downloads={0} views={0} />);

    expect(screen.getByText('citations', { exact: false }).textContent).toStrictEqual('0 citations');
    expect(screen.getByText('downloads', { exact: false }).textContent).toStrictEqual('0 downloads');
    expect(screen.getByText('views', { exact: false }).textContent).toStrictEqual('0 views');
  });

  it('renders a link that points to the metrics component', () => {
    render(<ContextualData citations={2} downloads={5000} views={12345} />);

    expect(screen.getByText('citations', { exact: false })).toHaveAttribute('href', '#metrics');
    expect(screen.getByText('downloads', { exact: false })).toHaveAttribute('href', '#metrics');
    expect(screen.getByText('views', { exact: false })).toHaveAttribute('href', '#metrics');
  });
});
