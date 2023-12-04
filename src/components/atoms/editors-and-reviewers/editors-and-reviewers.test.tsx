import { render, screen } from '@testing-library/react';
import { EditorsAndReviewers } from './editors-and-reviewers';

const participants = [
  { name: 'Steve Rogers', role: 'editor', institution: 'The Strategic Homeland Intervention, Enforcement, and Logistics Division, Washington, D.C., United States' },
  { name: 'Antony Stark', role: 'senior-editor', institution: 'Stark Industries, Los Angeles, California, United States' },
];

describe('Editors and Authors', () => {
  it('should render correctly a list of editors', () => {
    render(<EditorsAndReviewers participants={participants}/>);
    const captainAmerica = screen.getByText('Steve Rogers');
    const ironMan = screen.getByText('Antony Stark');
    const starkHq = screen.getByText('Stark Industries', { exact: false });
    const sheild = screen.getByText('Strategic Homeland', { exact: false });

    expect(captainAmerica).toBeInTheDocument();
    expect(ironMan).toBeInTheDocument();
    expect(starkHq).toBeInTheDocument();
    expect(sheild).toBeInTheDocument();
  });

  it('should render correctly with no institutions', () => {
    render(<EditorsAndReviewers participants={[
      { name: 'Anonymous', role: 'editor' },
      { name: 'Anonymous', role: 'senior-editor' },
    ]}/>);

    expect(document.querySelector('.editors-and-reviewers__person-affiliation')).not.toBeInTheDocument();
  });

  it('should render the editor and senior editor roles correctly', () => {
    render(<EditorsAndReviewers participants={participants}/>);

    expect(screen.getByText('Senior Editor')).toBeInTheDocument();
    expect(screen.getByText('Reviewing Editor')).toBeInTheDocument();
  });
});
