import { render, screen } from '@testing-library/react';
import { VersionHistory } from './version-history';

describe('Version History', () => {
  it('should render the verison history', () => {
    render(<VersionHistory versions={[]}/>);

    expect(screen.getByText('Versions')).toBeInTheDocument();
  });

  it.todo('displays the correct label for a preprint');
  it.todo('displays the correct label for a vor');
  it.todo('displays the correct label for peer review');
  it.todo('displays the date in the correct format');
  it.todo('has the correct link url when set');
  it.todo('has the correct link label when set');
  it.todo('displays the versions in the expected order');
});
