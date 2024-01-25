import './biophysics-colab.scss';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode,
};

export const BiophysicsColabLayout = ({ children }: Props) => (
  <>
    <div className="grid-container article-page">
      {children}
    </div>
  </>
);
