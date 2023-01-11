import { render, screen } from '@testing-library/react';
import { Button } from '../../atoms/button/button';

describe('Back to homepage button', () => {
  it('renders with the provided text', () => {
    render(<Button text="Back to homepage" url='/' />);

    expect(screen.getByText('Back to homepage')).toBeInTheDocument();
    expect(screen.getByText('Back to homepage')).toHaveAttribute('href');
    expect(screen.getByText('Back to homepage').getAttribute('href')).toStrictEqual('/');
  });
});
