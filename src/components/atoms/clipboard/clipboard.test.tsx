import { render, screen, fireEvent } from '@testing-library/react';
import { Clipboard } from './clipboard';

describe('Clipboard', () => {
  describe('navigation supported', () => {
    const writeTextMock: any = jest.fn().mockResolvedValue(true);

    beforeAll(() => {
      Object.defineProperty(global.navigator, 'clipboard', {
        value: {
          writeText: writeTextMock,
        },
        configurable: true,
      });
    });

    it('renders with the default button text', () => {
      render(<Clipboard text='will be copied to clipboard'/>);
      expect(screen.getByText('Copy to clipboard')).toBeInTheDocument();
    });

    it('calls the navigation clipboard write text api when the button is clicked', () => {
      const clipboardText = 'will be copied to clipboard';
      render(<Clipboard text={clipboardText}/>);

      expect(writeTextMock).toHaveBeenCalledTimes(0);

      fireEvent.click(screen.getByText('Copy to clipboard'));

      expect(writeTextMock).toHaveBeenCalledTimes(1);
      expect(writeTextMock).toHaveBeenCalledWith(clipboardText);
    });

    it('renders the button text when passed in', () => {
      const buttonText = 'I am a button';
      render(<Clipboard text='will be copied to clipboard' buttonText={buttonText}/>);

      expect(screen.queryByText('Copy to clipboard')).not.toBeInTheDocument();
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });
  });

  describe('navigation not supported', () => {
    it('does not render the button if clipboard is not supported', () => {
      Object.defineProperty(global.navigator, 'clipboard', {
        value: false,
        configurable: true,
      });
      render(<Clipboard text='will be copied to clipboard'/>);

      expect(screen.queryByText('Copy to clipboard')).not.toBeInTheDocument();
    });
  });
});
