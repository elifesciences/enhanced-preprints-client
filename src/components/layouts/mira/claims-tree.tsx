import { type JSX, type ReactNode } from 'react';
import './claims-tree.scss';

type Props = {
  children: ReactNode,
};

export const ClaimsTreeLayout = ({ children }: Props): JSX.Element => (
  <main className="page-wrapper">
    {children}
  </main>
);
