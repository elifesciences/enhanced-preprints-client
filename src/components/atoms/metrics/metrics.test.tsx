import { render, screen } from '@testing-library/react';
import { Metrics } from './metrics';

describe('JumpToMenu', () => {
  it('should render zero metrics', () => {
    render(<Metrics metrics={{ views: 0, downloads: 0, citations: 0 }} />);

    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Citations')).toBeInTheDocument();

    expect(screen.getByText('Views').nextSibling?.textContent).toBe('0');
    expect(screen.getByText('Downloads').nextSibling?.textContent).toBe('0');
    expect(screen.getByText('Citations').nextSibling?.textContent).toBe('0');
  });

  it('should render many metrics', () => {
    render(<Metrics metrics={{ views: 789, downloads: 456, citations: 123 }} />);

    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Citations')).toBeInTheDocument();

    expect(screen.getByText('Views').nextSibling?.textContent).toBe('789');
    expect(screen.getByText('Downloads').nextSibling?.textContent).toBe('456');
    expect(screen.getByText('Citations').nextSibling?.textContent).toBe('123');
  });

  it('should render singular metrics with correct phrasing', () => {
    render(<Metrics metrics={{ views: 1, downloads: 1, citations: 1 }} />);

    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('Citation')).toBeInTheDocument();
  });
});
