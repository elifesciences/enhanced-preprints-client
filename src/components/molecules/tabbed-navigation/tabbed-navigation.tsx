import { ReactElement, useState } from 'react';
import { TabProps } from './tab';

import './tabbed-navigation.scss';

type TabbedNavigationProps = {
  initiallySelected?: number,
  children: ReactElement<TabProps>[],
};

export const TabbedNavigation = ({ children, initiallySelected = 0 }: TabbedNavigationProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(initiallySelected);

  return (
    <div className="tabbed-navigation">
      <ul className="tabbed-navigation__tabs">
        {children.map((child, index) => {
          const { label } = child.props;

          return (<li className={`tabbed-navigation__tab-label ${activeTab === index ? 'tabbed-navigation__tab-label--active' : ''}`} key={label} onClick={() => setActiveTab(index)}>{label}</li>);
        })}
      </ul>
      <div className="tabbed-navigation__content">
        {children[activeTab]}
      </div>
    </div>
  );
};
