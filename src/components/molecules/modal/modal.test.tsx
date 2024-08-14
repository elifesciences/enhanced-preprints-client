import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal window', () => {
  it('does not show', () => {
    render(<Modal modalTitle='This is the title'>This is the content</Modal>);

    expect(screen.queryByText('This is the content')).not.toBeInTheDocument();
  });

  it('does not render the children when open is false', () => {
    render(<Modal modalTitle='This is the title' open={false}>This is the content</Modal>);

    expect(screen.queryByText('This is the content')).not.toBeInTheDocument();
  });

  it('is shown when open set to true', () => {
    render(<Modal modalTitle='This is the title' open={true}>This is the content</Modal>);

    expect(screen.queryByText('This is the content')).toBeInTheDocument();
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
    expect(screen.queryByText('This is the content')).toBeInTheDocument();

    expect(onModalCloseIndicator).toStrictEqual(false);

    const hideModalBlock = screen.getByText('Close', { exact: false });
    fireEvent.click(hideModalBlock);

    expect(onModalCloseIndicator).toStrictEqual(true);
  });

  it('only displays warning message in modalWarning set', () => {
    render(<Modal modalTitle='This is the title' open={true}>This is the content</Modal>);

    expect(screen.queryByText('Warning text', { exact: false })).not.toBeInTheDocument();

    render(<Modal modalTitle='This is the title' open={true} modalWarning={'Warning text'}>This is the content</Modal>);

    expect(screen.queryByText('Warning text', { exact: false })).toBeInTheDocument();
  });
});
