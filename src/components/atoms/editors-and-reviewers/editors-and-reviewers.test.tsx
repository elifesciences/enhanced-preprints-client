/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { EditorsAndReviewers } from './editors-and-reviewers';

const participants = [
  { name: 'Steve Rogers', role: 'Reviewing Editor', institution: 'The Strategic Homeland Intervention, Enforcement, and Logistics Division, Washington, D.C., United States' },
  { name: 'Antony Stark', role: 'Senior Editor', institution: 'Stark Industries, Los Angeles, California, United States' },
];

describe('authors', () => {
  afterEach(cleanup);
  test('should render correctly a list of authors', () => {
    render(<EditorsAndReviewers participants={participants}/>);
    const captainAmerica = screen.getByText('Steve Rogers');
    const ironMan = screen.getByText('Antony Stark');
    const starkHq = screen.getByText('Stark Industries', { exact: false });
    const sheild = screen.getByText('Strategic Homeland', { exact: false });

    expect(captainAmerica).toBeTruthy();
    expect(ironMan).toBeTruthy();
    expect(starkHq).toBeTruthy();
    expect(sheild).toBeTruthy();
  });
});
