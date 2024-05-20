import { render } from '@testing-library/react';
import { PreviousVersionWarning } from './previous-version-warning';

describe('PreviousVersionWarning', () => {
  it('renders correctly', () => {
    const { getByText } = render(<PreviousVersionWarning url="www.google.com" />);

    expect(getByText('A newer version is available.')).toBeInTheDocument();
  });
});
