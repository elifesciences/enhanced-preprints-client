import { ReactNode } from 'react';
import './biophysics-colab.scss';

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
