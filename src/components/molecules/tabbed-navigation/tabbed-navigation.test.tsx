import { fireEvent, render, screen } from '@testing-library/react';
import { TabbedNavigation } from './tabbed-navigation';
import { Tab } from './tab';

describe('TabbedNavigation', () => {
  it('renders a nav item for each tab', () => {
    render(
      <TabbedNavigation>
        <Tab label="tab label 1">tab content 1</Tab>
        <Tab label="tab label 2">tab content 2</Tab>
      </TabbedNavigation>,
    );

    expect(screen.getByText('tab label 1')).toBeInTheDocument();
    expect(screen.getByText('tab label 2')).toBeInTheDocument();
  });

  it('renders the correct tab on first render', () => {
    render(
      <TabbedNavigation initiallySelected={1}>
        <Tab label="tab label 1">tab content 1</Tab>
        <Tab label="tab label 2">tab content 2</Tab>
      </TabbedNavigation>,
    );

    expect(screen.getByText('tab content 2')).toBeInTheDocument();
  });

  it('changes the tab on clicking the header',  () => {
    render(
      <TabbedNavigation>
        <Tab label="tab label 1">tab content 1</Tab>
        <Tab label="tab label 2">tab content 2</Tab>
      </TabbedNavigation>,
    );

    expect(screen.getByText('tab content 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('tab label 2'));

    expect(screen.getByText('tab content 2')).toBeInTheDocument();
  });
});
