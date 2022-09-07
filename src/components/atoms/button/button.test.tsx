import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with the provided text and iconName', () => {
    render(<Button text="button text" iconName="dark_mode" />);

    expect(screen.getByText('button text')).toBeInTheDocument();
    expect(screen.getByText('dark_mode')).toBeInTheDocument();
    expect(screen.getByText('dark_mode')).toHaveClass('material-icons');
  });
});
