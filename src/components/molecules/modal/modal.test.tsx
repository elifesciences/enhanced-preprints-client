/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal window', () => {
  afterEach(cleanup);
  test('does not show', () => {
    render(<Modal modalTitle='This is the title'>This is the content</Modal>);

    expect(screen.queryByText('This is the content')).toBeNull();
  });

  test('does not render the children when open is false', () => {
    render(<Modal modalTitle='This is the title' open={false}>This is the content</Modal>);

    expect(screen.queryByText('This is the content')).toBeNull();
  });

  test('is shown when open set to true', () => {
    render(<Modal modalTitle='This is the title' open={true}>This is the content</Modal>);

    expect(screen.queryByText('This is the content')).toBeTruthy();
  });

  test('only displays a close button if onModalClose set', () => {
    render(<Modal modalTitle='This is the title' open={true}>This is the content</Modal>);

    expect(screen.queryByText('Close', { exact: false })).toBeNull();

    render(<Modal modalTitle='This is the title' open={true} onModalClose={() => {}}>This is the content</Modal>);

    expect(screen.queryByText('Close', { exact: false })).toBeTruthy();
  });

  test('runs onModalClose function', () => {
    let onModalCloseIndicator = false;
    render(<Modal modalTitle='This is the title' open={true} onModalClose={() => {
      onModalCloseIndicator = true;
    }}>This is the content</Modal>);
    expect(screen.queryByText('This is the content')).toBeTruthy();

    expect(onModalCloseIndicator).toStrictEqual(false);

    const hideModalBlock = screen.getByText('Close', { exact: false });
    fireEvent.click(hideModalBlock);

    expect(onModalCloseIndicator).toStrictEqual(true);
  });
});
