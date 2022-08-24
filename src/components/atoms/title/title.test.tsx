import { render, screen } from '@testing-library/react';
import { Title } from './title';

describe('Title', () => {
  it('should render the title with the passed in title prop', () => {
    const title = 'This is a title';
    render(<Title title={title}/>);

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
