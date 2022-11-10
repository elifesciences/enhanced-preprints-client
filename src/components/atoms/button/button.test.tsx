import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with the provided text and iconName', () => {
    render(<Button text="button text" iconName="dark_mode" url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeInTheDocument();
    expect(screen.getByText('button text')).toHaveClass('dark_mode');
    expect(screen.getByText('button text')).toHaveAttribute('href');
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });
});
