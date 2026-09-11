import { type JSX, type ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

// ts-unused-exports:disable-next-line
export const BlankLayout = ({ children }: Props): JSX.Element => (
  <>
    <div>
      {children}
    </div>
  </>
);
