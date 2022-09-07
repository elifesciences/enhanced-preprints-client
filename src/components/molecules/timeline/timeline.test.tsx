import { render, screen } from '@testing-library/react';
import { Timeline } from './timeline';

describe('Timeline', () => {
  it('renders the default timeline when no props are passed in', () => {
    render(<Timeline/>);

    expect(screen.getByText('Author response')).toBeInTheDocument();
    expect(screen.getByText('06/03/2022')).toBeInTheDocument();
    expect(screen.getByText('Peer review')).toBeInTheDocument();
    expect(screen.getByText('03/03/2022')).toBeInTheDocument();
    expect(screen.getByText('Preprint posted')).toBeInTheDocument();
    expect(screen.getByText('08/11/2021')).toBeInTheDocument();
  });

  it('renders the events passed in as a param', () => {
    render(<Timeline events={[
      { name: 'event1', date: new Date('2001/01/13') },
      { name: 'event2', date: new Date('2002/02/14') },
    ]}/>);

    expect(screen.getByText('event1')).toBeInTheDocument();
    expect(screen.getByText('13/01/2001')).toBeInTheDocument();
    expect(screen.getByText('event2')).toBeInTheDocument();
    expect(screen.getByText('14/02/2002')).toBeInTheDocument();
  });
});
