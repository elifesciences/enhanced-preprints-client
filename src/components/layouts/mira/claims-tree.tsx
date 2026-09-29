import { type JSX, type ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

export const ClaimsTreeLayout = ({ children }: Props): JSX.Element => (
  <>
    <div>
      {children}
    </div>
  </>
);
