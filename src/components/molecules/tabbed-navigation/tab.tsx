import { ReactNode } from 'react';

import styles from './tab.module.scss';

export type TabProps = {
  label: string,
  children: ReactNode,
};

export const Tab = ({ children }: TabProps): JSX.Element => (
  <div className={styles['tabbed-navigation__content']}>{children}</div>
);
