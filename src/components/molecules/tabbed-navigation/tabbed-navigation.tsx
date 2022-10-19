import { ReactElement } from 'react';
import { TabProps } from './tab';

import styles from './tabbed-navigation.module.scss';

type TabbedNavigationProps = {
  activeTab: number,
  setActiveTab: (index: number) => void,
  children: ReactElement<TabProps>[],
};

export const TabbedNavigation = ({ children, activeTab, setActiveTab }: TabbedNavigationProps): JSX.Element => (
  <div className={styles['tabbed-navigation']}>
    <ul className={styles['tabbed-navigation__tabs']}>
      {children.map((child, index) => {
        const { label } = child.props;

        return (<li className={`${styles['tabbed-navigation__tab-label']}${activeTab === index ? ` ${styles['tabbed-navigation__tab-label--active']}` : ''}`} key={label} onClick={() => setActiveTab(index)}>{label}</li>);
      })}
    </ul>
    {children[activeTab]}
  </div>
);
