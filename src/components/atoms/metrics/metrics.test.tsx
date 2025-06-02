import { render, screen } from '@testing-library/react';
import { Metrics } from './metrics';

describe('JumpToMenu', () => {
  it('should render zero metrics', () => {
    render(<Metrics metrics={{ views: 0, downloads: 0, citations: 0 }} doi='85111' />);

    expect(screen.getByText('views')).toBeInTheDocument();
    expect(screen.getByText('downloads')).toBeInTheDocument();
    expect(screen.getByText('citations')).toBeInTheDocument();

    expect(screen.getByText('views').nextSibling?.textContent).toBe('0');
    expect(screen.getByText('downloads').nextSibling?.textContent).toBe('0');
    expect(screen.getByText('citations').nextSibling?.textContent).toBe('0');
  });

  it('should render many metrics', () => {
    render(<Metrics metrics={{ views: 789, downloads: 456, citations: 123 }} doi='85111' />);

    expect(screen.getByText('views')).toBeInTheDocument();
    expect(screen.getByText('downloads')).toBeInTheDocument();
    expect(screen.getByText('citations')).toBeInTheDocument();

    expect(screen.getByText('views').nextSibling?.textContent).toBe('789');
    expect(screen.getByText('downloads').nextSibling?.textContent).toBe('456');
    expect(screen.getByText('citations').nextSibling?.textContent).toBe('123');
  });

  it('should render thousands metrics with commas', () => {
    render(<Metrics metrics={{ views: 123456789, downloads: 456789, citations: 123 }} doi='85111' />);

    expect(screen.getByText('views')).toBeInTheDocument();
    expect(screen.getByText('downloads')).toBeInTheDocument();
    expect(screen.getByText('citations')).toBeInTheDocument();

    expect(screen.getByText('views').nextSibling?.textContent).toBe('123,456,789');
    expect(screen.getByText('downloads').nextSibling?.textContent).toBe('456,789');
    expect(screen.getByText('citations').nextSibling?.textContent).toBe('123');
  });

  it('should render singular metrics with correct phrasing', () => {
    const { rerender } = render(<Metrics metrics={{ views: 1, downloads: 0, citations: 0 }} doi='85111' />);

    expect(screen.getByText('view')).toBeInTheDocument();
    expect(screen.getByText('downloads')).toBeInTheDocument();
    expect(screen.getByText('citations')).toBeInTheDocument();

    rerender(<Metrics metrics={{ views: 1, downloads: 1, citations: 0 }} doi='85111' />);

    expect(screen.getByText('view')).toBeInTheDocument();
    expect(screen.getByText('download')).toBeInTheDocument();
    expect(screen.getByText('citations')).toBeInTheDocument();

    rerender(<Metrics metrics={{ views: 1, downloads: 1, citations: 1 }} doi='85111' />);

    expect(screen.getByText('view')).toBeInTheDocument();
    expect(screen.getByText('download')).toBeInTheDocument();
    expect(screen.getByText('citation')).toBeInTheDocument();
  });
});
