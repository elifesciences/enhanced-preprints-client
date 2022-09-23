import { ReactElement, useEffect, useState } from 'react';
import { TabProps } from './tab';

import styles from './tabbed-navigation.module.scss';

type TabbedNavigationProps = {
  initiallySelected?: number | false,
  children: ReactElement<TabProps>[],
};

export const TabbedNavigation = ({ children, initiallySelected = 0 }: TabbedNavigationProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number | false>(false);
  useEffect(() => {
    setActiveTab(initiallySelected);
  }, []);

  return (
    <div className={styles['tabbed-navigation']}>
      <ul className={styles['tabbed-navigation__tabs']}>
        {children.map((child, index) => {
          const { label } = child.props;

          return (<li className={`${styles['tabbed-navigation__tab-label']}${activeTab === index ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} key={label} onClick={() => setActiveTab(index)}>{label}</li>);
        })}
      </ul>
      {activeTab === false ? children : children[activeTab]}
    </div>
  );
};
