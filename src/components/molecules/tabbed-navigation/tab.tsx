import { FC } from 'react';

export type TabProps = {
  label: string,
  children: React.ReactNode,
};

export const Tab: FC<TabProps> = ({ children }: TabProps): JSX.Element => (
  <div>{children}</div>
);
