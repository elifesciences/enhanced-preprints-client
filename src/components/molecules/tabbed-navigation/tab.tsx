import { ReactNode } from 'react';

export type TabProps = {
  label: string,
  children: ReactNode,
};

export const Tab = ({ children }: TabProps): JSX.Element => (
  <div className="tabbed-navigation__tab-content">{children}</div>
);
