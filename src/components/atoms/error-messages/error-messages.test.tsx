import { render, screen } from '@testing-library/react';
import { ErrorMessages } from './error-messages';

describe('ErrorMessages', () => {
  it('should render the ErrorMessages component', () => {
    render(<ErrorMessages/>);

    expect(screen.getByText("We're looking into it")).toBeInTheDocument();
  });
});
