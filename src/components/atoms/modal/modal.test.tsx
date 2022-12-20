import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal window', () => {
  it('button shows', () => {
    render(<Modal modalTitle='This is the title' children='This is the content' />);

    expect(screen.getByText('Modal Link')).toBeInTheDocument();
  });

  it('does not show', () => {
    render(<Modal modalTitle='This is the title' children='This is the content' />);

    expect(screen.getByText('This is the content').parentElement?.parentElement).not.toHaveClass('modal-content__show');
  });

  it('shows on click', () => {
    render(<Modal modalTitle='This is the title' children='This is the content' />);
    expect(screen.getByText('This is the content').parentElement?.parentElement).not.toHaveClass('modal-content__show');

    const showModalBlock = screen.getByText('modal link', { exact: false });
    fireEvent.click(showModalBlock);

    expect(screen.getByText('This is the content').parentElement?.parentElement).toHaveClass('modal-content__show');
  });

  it('hides on click', () => {
    render(<Modal modalTitle='This is the title' children='This is the content' />);
    expect(screen.getByText('This is the content').parentElement?.parentElement).not.toHaveClass('modal-content__show');

    const showModalBlock = screen.getByText('modal link', { exact: false });
    fireEvent.click(showModalBlock);

    expect(screen.getByText('This is the content').parentElement?.parentElement).toHaveClass('modal-content__show');

    const hideModalBlock = screen.getByText('modal link', { exact: false });
    fireEvent.click(hideModalBlock);

    expect(screen.getByText('This is the content').parentElement?.parentElement).not.toHaveClass('modal-content__show');
  });
});
