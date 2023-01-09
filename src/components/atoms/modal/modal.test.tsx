import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal window', () => {
  it('does not show', () => {
    render(<Modal modalTitle='This is the title'>This is the content</Modal>);

    expect(screen.getByText('This is the content').parentElement?.parentElement?.parentElement).not.toHaveClass('modal-content__show');
  });

  it('is hidden when open set to false', () => {
    render(<Modal modalTitle='This is the title' open={false}>This is the content</Modal>);

    expect(screen.getByText('This is the content').parentElement?.parentElement?.parentElement).not.toHaveClass('modal-content__show');
  });

  it('is shown when open set to true', () => {
    render(<Modal modalTitle='This is the title' open={true}>This is the content</Modal>);

    expect(screen.getByText('This is the content').parentElement?.parentElement?.parentElement).toHaveClass('modal-content__show');
  });

  it('only displays a close button if onModalClose set', () => {
    render(<Modal modalTitle='This is the title' open={true}>This is the content</Modal>);

    expect(screen.queryByText('Close', { exact: false })).not.toBeInTheDocument();

    render(<Modal modalTitle='This is the title' open={true} onModalClose={() => {}}>This is the content</Modal>);

    expect(screen.queryByText('Close', { exact: false })).toBeInTheDocument();
  });

  it('runs onModalClose function', () => {
    let onModalCloseIndicator = false;
    render(<Modal modalTitle='This is the title' open={true} onModalClose={() => {
      onModalCloseIndicator = true;
    }}>This is the content</Modal>);
    expect(screen.getByText('This is the content').parentElement?.parentElement?.parentElement).toHaveClass('modal-content__show');

    expect(onModalCloseIndicator).toStrictEqual(false);

    const hideModalBlock = screen.getByText('Close', { exact: false });
    fireEvent.click(hideModalBlock);

    expect(onModalCloseIndicator).toStrictEqual(true);
  });
});
