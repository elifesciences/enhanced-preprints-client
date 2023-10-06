/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach, beforeAll } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Clipboard } from './clipboard';

describe('Clipboard', () => {
  afterEach(cleanup);
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

    test('renders with the default button text', () => {
      render(<Clipboard text='will be copied to clipboard'/>);
      expect(screen.getByText('Copy to clipboard')).toBeTruthy();
    });

    test('calls the navigation clipboard write text api when the button is clicked', () => {
      const clipboardText = 'will be copied to clipboard';
      render(<Clipboard text={clipboardText}/>);

      expect(writeTextMock).toBeCalledTimes(0);

      fireEvent.click(screen.getByText('Copy to clipboard'));

      expect(writeTextMock).toBeCalledTimes(1);
      expect(writeTextMock).toBeCalledWith(clipboardText);
    });

    test('renders the button text when passed in', () => {
      const buttonText = 'I am a button';
      render(<Clipboard text='will be copied to clipboard' buttonText={buttonText}/>);

      expect(() => screen.queryByText('Copy to clipboard')).toThrow();
      expect(screen.getByText(buttonText)).toBeTruthy();
    });
  });

  describe('navigation not supported', () => {
    test('does not render the button if clipboard is not supported', () => {
      Object.defineProperty(global.navigator, 'clipboard', {
        value: false,
        configurable: true,
      });
      render(<Clipboard text='will be copied to clipboard'/>);

      expect(() => screen.queryByText('Copy to clipboard')).toThrow();
    });
  });
});
