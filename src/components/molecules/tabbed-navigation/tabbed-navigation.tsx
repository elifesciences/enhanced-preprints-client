import { ReactElement, useState } from 'react';
import { TabProps } from './tab';

type TabbedNavigationProps = {
  children: ReactElement<TabProps>[],
};

export const TabbedNavigation = ({ children }: TabbedNavigationProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabbed-navigation">
      <ul className="tabbed-navigation__tabs">
        {children.map((child, index) => {
          const { label } = child.props;

          return (
            <li
              key={label}
              onClick={() => setActiveTab(index)}
            >{label}</li>
          );
        })}
      </ul>
      <div className="tabbed-navigation__content">
        {children[activeTab]}
      </div>
    </div>
  );
};
