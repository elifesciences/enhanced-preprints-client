import { render, screen } from '@testing-library/react';
import { Tab } from './tab';

describe('Tab', () => {
  it('renders the children', () => {
    render(
      <Tab label="">
        <span>child span</span>
      </Tab>,
    );

    expect(screen.getByText('child span')).toBeInTheDocument();
    expect(screen.getByText('child span').tagName).toStrictEqual('SPAN');
  });

  it('does not render the label', () => {
    render(
      <Tab label="label">
        <span>child span</span>
      </Tab>,
    );

    expect(screen.queryByText('label')).not.toBeInTheDocument();
  });
});
