import { render, screen } from '@testing-library/react';
import { VersionHistory } from './version-history';

describe('Version History', () => {
  it('should render the verison history', () => {
    render(<VersionHistory/>);

    expect(screen.getByText('Versions')).toBeInTheDocument();
  });
});
