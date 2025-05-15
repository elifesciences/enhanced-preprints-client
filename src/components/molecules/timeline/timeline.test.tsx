import { fireEvent, render, screen } from '@testing-library/react';
import { Timeline } from './timeline';
import '../../../i18n';

describe('Timeline', () => {
  it('renders a single timeline item', () => {
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValueOnce('13/01/2001');
    render(<Timeline events={[
      {
        url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
      },
    ]}
    />);

    const firstItem = screen.getByText('January 13, 2001');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem).toHaveAttribute('dateTime', '2001-01-13T00:00:00.000Z');
    expect(screen.getByText('Reviewed Preprint')).toBeInTheDocument();
    expect(screen.getByText('v1')).toBeInTheDocument();
    expect(screen.getByText('Not revised')).toHaveAttribute('href', '#/reviews#review-process');
  });

  it('may have a timeline item with a name', () => {
    render(<Timeline events={[
      {
        name: 'New name', url: '#', version: 1, date: new Date('2001-01-13'),
      },
    ]}
    />);

    const firstItem = screen.getByText('January 13, 2001');
    expect(firstItem).toBeInTheDocument();
    expect(screen.getByText('New name')).toBeInTheDocument();
  });

  it('may have a timeline item with a date prefix', () => {
    render(<Timeline events={[
      {
        datePrefix: 'Updated', url: '#', version: 1, date: new Date('2001-01-13'),
      },
    ]}
    />);

    const firstItem = screen.getByText('January 13, 2001');
    expect(firstItem).toBeInTheDocument();
    expect(screen.getByText('Updated')).toBeInTheDocument();
  });

  it('has an appropriate aria-label', () => {
    render(<Timeline events={[
      {
        url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
      },
    ]}
    />);

    expect(document.querySelector('#review-timeline')).toHaveAttribute('aria-label', 'Version history');
  });

  it('renders a single revised timeline item', () => {
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValueOnce('14/02/2002');
    render(<Timeline events={[
      {
        url: '#', version: 2, date: new Date('2002-02-14'), versionIndicator: 'v2',
      },
    ]}
    />);

    const firstItem = screen.getByText('February 14, 2002');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem).toHaveAttribute('dateTime', '2002-02-14T00:00:00.000Z');
    expect(screen.getByText('Reviewed Preprint')).toBeInTheDocument();
    expect(screen.getByText('v2')).toBeInTheDocument();
    expect(screen.getByText('Revised by authors')).toHaveAttribute('href', '#/reviews#review-process');
  });

  it('renders multiple reviewed timeline items, and one curated', () => {
    render(<Timeline events={[
      {
        name: 'Curated Preprint', url: '#', version: 3, date: new Date('2003-03-26'), versionIndicator: 'v3',
      },
      {
        url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
      },
      {
        url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
      },
    ]}
    />);

    expect(screen.getAllByText('Reviewed Preprint')).toHaveLength(2);
    expect(screen.getAllByText('Curated Preprint')).toHaveLength(1);
  });

  describe('collapsable behaviours', () => {
    const getVisibleDtElements = () => Array.from(document.querySelectorAll('dt')).filter((dt) => dt.style.display !== 'none');

    it('should not show the expand text when there is only one entry', () => {
      render(<Timeline events={[
        {
          url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
        },
      ]}
      />);

      expect(document.querySelector('.review-timeline__expansion')).not.toBeInTheDocument();
    });

    it('should show the expand text when there is more than one entry', () => {
      render(<Timeline events={[
        {
          url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
        },
        {
          url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
        },
      ]}
      />);

      expect(document.querySelector('.review-timeline__expansion')).toBeInTheDocument();
    });

    it('should expand when the text is clicked', () => {
      render(<Timeline current={2} events={[
        {
          url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
        },
        {
          url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
        },
      ]}
      />);

      expect(getVisibleDtElements()).toHaveLength(1);

      fireEvent.click(screen.getByText('Show previous version'));

      expect(getVisibleDtElements()).toHaveLength(2);
    });

    it('should collapse when the text is clicked', () => {
      render(<Timeline current={2} events={[
        {
          url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
        },
        {
          url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
        },
      ]}
      />);

      fireEvent.click(screen.getByText('Show previous version'));

      expect(getVisibleDtElements()).toHaveLength(2);

      fireEvent.click(screen.getByText('Hide previous version'));

      expect(getVisibleDtElements()).toHaveLength(1);
    });

    it('should notify screen readers of expansion', () => {
      render(<Timeline current={2} events={[
        {
          url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
        },
        {
          url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
        },
      ]}
      />);

      const expandButton = document.querySelector('.review-timeline__expansion');

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(screen.getByText('Show previous version'));

      expect(expandButton).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(screen.getByText('Hide previous version'));

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    });

    describe('collapsed', () => {
      it('should show the text "Show all versions" when there are more than one entries and the latest is not the current', () => {
        render(<Timeline current={1} events={[
          {
            url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
          },
          {
            url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
          },
        ]}
        />);

        expect(screen.getByText('Show all versions')).toBeInTheDocument();
      });

      it('should show the text "Show previous version" when there are two entries and the latest is the current', () => {
        render(<Timeline current={2} events={[
          {
            url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
          },
          {
            url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
          },
        ]}
        />);

        expect(screen.getByText('Show previous version')).toBeInTheDocument();
      });

      it('should show the text "Show previous versions" when there are more than two entries and the latest is the current', () => {
        render(<Timeline current={3} events={[
          {
            url: '#', version: 3, date: new Date('2003-03-26'), versionIndicator: 'v3',
          },
          {
            url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
          },
          {
            url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
          },
        ]}
        />);

        expect(screen.getByText('Show previous versions')).toBeInTheDocument();
      });
    });

    describe('expanded', () => {
      it('should show the text "Hide all versions" when there are more than one entries and the latest is not the current', () => {
        render(<Timeline current={1} events={[
          {
            url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
          },
          {
            url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
          },
        ]}
        />);

        fireEvent.click(screen.getByText('Show all versions'));

        expect(screen.getByText('Hide all versions')).toBeInTheDocument();
      });

      it('should show the text "Hide previous version" when there are two entries and the latest is the current', () => {
        render(<Timeline current={2} events={[
          {
            url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
          },
          {
            url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
          },
        ]}
        />);

        fireEvent.click(screen.getByText('Show previous version'));

        expect(screen.getByText('Hide previous version')).toBeInTheDocument();
      });

      it('should show the text "Hide previous versions" when there are more than two entries and the latest is the current', () => {
        render(<Timeline current={3} events={[
          {
            url: '#', version: 3, date: new Date('2003-03-26'),
          },
          {
            url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
          },
          {
            url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
          },
        ]}
        />);

        fireEvent.click(screen.getByText('Show previous versions'));

        expect(screen.getByText('Hide previous versions')).toBeInTheDocument();
      });
    });
  });

  describe('sorting', () => {
    const entries = [
      {
        url: '#', version: 2, date: new Date('2002-02-23'), versionIndicator: 'v2',
      },
      {
        url: '#', version: 1, date: new Date('2001-01-13'), versionIndicator: 'v1',
      },
      {
        url: '#', version: 3, date: new Date('2003-03-26'), versionIndicator: 'v3',
      },
    ];

    it('should display the correct entry regardless of input order', () => {
      render(<Timeline current={3} events={entries}/>);

      expect(screen.getByText('March 26, 2003')).toBeInTheDocument();
    });

    it('should display the entries in the correct order when expanded', () => {
      render(<Timeline current={3} events={entries}/>);

      fireEvent.click(document.getElementsByClassName('review-timeline__expansion')[0]);

      const dates = Array.from(document.querySelectorAll('.review-timeline__date')).map((node) => node.innerHTML);

      expect(dates[0]).toStrictEqual('March 26, 2003');
      expect(dates[1]).toStrictEqual('February 23, 2002');
      expect(dates[2]).toStrictEqual('January 13, 2001');
    });
  });
});
