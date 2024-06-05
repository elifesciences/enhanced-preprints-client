import { render, screen } from '@testing-library/react';
import { VersionHistory } from './version-history';

describe('Version History', () => {
  it('should render the verison history', () => {
    render(<VersionHistory versions={[]}/>);

    expect(screen.getByText('Versions')).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    const versions = [
      {
        label: 'Label',
        date: new Date(),
      },
    ];

    render(<VersionHistory versions={versions}/>);

    expect(screen.getByText('Label', { exact: false })).toBeInTheDocument();
  });

  it('displays the date in the correct format', () => {
    const versions = [
      {
        label: 'Label',
        date: new Date('2024-06-05'),
      },
    ];

    render(<VersionHistory versions={versions}/>);

    expect(screen.getByText('June 5, 2024')).toBeInTheDocument();
  });

  it('has the correct link url when set', () => {
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

  it('displays the versions in the expected order', () => {
    const versions = [
      {
        label: 'Label',
        date: new Date('2024-06-05'),
      },
      {
        label: 'Label',
        date: new Date('2023-06-05'),
      },
    ];

    render(<VersionHistory versions={versions}/>);
    const dates = Array.from(document.querySelectorAll('TIME')).map((node) => node.innerHTML);

    expect(dates[0]).toStrictEqual('June 5, 2023');
    expect(dates[1]).toStrictEqual('June 5, 2024');
  });
});
