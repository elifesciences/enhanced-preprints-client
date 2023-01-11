import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders with the provided text', () => {
    render(<Button text='button text' url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeInTheDocument();
    expect(screen.getByText('button text')).toHaveAttribute('href');
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });

  it('renders with the provided text and iconName', () => {
    render(<Button text='button text' iconName='download' url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeInTheDocument();
    expect(screen.getByText('button text')).toHaveClass('button--icon-download');
    expect(screen.getByText('button text')).toHaveAttribute('href');
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });

  it('renders with the provided text, iconName and variant', () => {
    render(<Button text='button text' iconName='follow' variant='action' url='bbc.co.uk' />);

    expect(screen.getByText('button text')).toBeInTheDocument();
    expect(screen.getByText('button text')).toHaveClass('button--icon-follow');
    expect(screen.getByText('button text')).toHaveClass('button--action');
    expect(screen.getByText('button text')).toHaveAttribute('href');
    expect(screen.getByText('button text').getAttribute('href')).toStrictEqual('bbc.co.uk');
  });
});
