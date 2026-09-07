import { type JSX, type ReactNode } from 'react';
import './default.scss';

type Props = {
  children: ReactNode,
};

export const BlankLayout = ({ children }: Props): JSX.Element => (
  <>
    <div>
      {children}
    </div>
  </>
);
