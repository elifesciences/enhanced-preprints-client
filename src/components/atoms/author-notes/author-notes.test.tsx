import { render, screen } from '@testing-library/react';
import { AuthorNotes } from './author-notes';
import { authorNotes } from '../../../utils/mocks';

describe('Author Notes', () => {
  it('should render author notes', () => {
    const title = 'Author Notes';
    render(<AuthorNotes authorNotes={authorNotes} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
