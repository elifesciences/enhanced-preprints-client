import { render, screen } from '@testing-library/react';
import { VersionHistory } from './version-history';

describe('Version History', () => {
  it('should render the verison history', () => {
    render(<VersionHistory versions={[]}/>);

    expect(screen.getByText('Versions')).toBeInTheDocument();
  });

  it.failing('displays the correct label', () => {
    const versions = [
      {
        label: 'Label',
        date: new Date(),
      },
    ];

    render(<VersionHistory versions={versions}/>);

    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it.failing('displays the date in the correct format', () => {
    const versions = [
      {
        label: 'Label',
        date: new Date('2024-06-05'),
      },
    ];

    render(<VersionHistory versions={versions}/>);

    expect(screen.getByText('June 5, 2024')).toBeInTheDocument();
  });

  it.failing('has the correct link url when set', () => {
    const versions = [
      {
        label: 'Label',
        date: new Date(),
        url: 'www.elifesciences.org',
      },
    ];

    render(<VersionHistory versions={versions}/>);
    expect(document.querySelector('A')).toHaveAttribute('href', 'www.elifesciences.org');
  });
  it.todo('has the correct link label when set');
  it.todo('displays the versions in the expected order');
});
