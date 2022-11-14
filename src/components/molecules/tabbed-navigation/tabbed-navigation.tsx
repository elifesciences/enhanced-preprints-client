import { ReactElement } from 'react';
import { TabProps } from './tab';

import styles from './tabbed-navigation.module.scss';

type TabbedNavigationProps = {
  activeTab: number,
  setActiveTab: (index: number) => void,
  children: ReactElement<TabProps>[],
};

export const TabbedNavigation = ({ children, activeTab, setActiveTab }: TabbedNavigationProps): JSX.Element => (
  <nav className={styles['tabbed-navigation']} aria-label="Main tabbed navigation">
    <ul className={styles['tabbed-navigation__tabs']}>
      {children.map((child, index) => {
        const { label } = child.props;

        return (<li className={`${styles['tabbed-navigation__tabs-item']}${activeTab === index ? ` ${styles['tabbed-navigation__tabs-item--active']}` : ''}`} key={label} onClick={() => setActiveTab(index)}>{label}</li>);
      })}
    </ul>
    {children[activeTab]}
  </nav>
);
