import { render, screen } from '@testing-library/react';
import { Clipboard } from './clipboard';

describe('Clipboard', () => {
  it('renders with the default button text', () => {
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(true),
      },
    });

    render(<Clipboard text='will be copied to clipboard' />);
    expect(screen.getByText('Copy to clipboard')).toBeInTheDocument();
  });

  it.only('renders with the default button text', () => {
    const writeTextMock = jest.fn().mockResolvedValue(true);
    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
    });

    render(<Clipboard text='will be copied to clipboard' />);
    expect(writeTextMock).toBeCalled();
  });
});
