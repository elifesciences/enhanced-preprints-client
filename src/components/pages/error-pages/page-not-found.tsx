import Image from 'next/image';
import './page-not-found.scss';
import MissingImage from '../../../images/errors/404.svg';
import { Button } from '../../atoms/button/button';

export const PageNotFound = () => (
  <main className="full-width-section">
    <div className="error-wrapper">
      <div className="error">
        <Image src={MissingImage} width="64" height="157" alt="Oops" className="error__icon" />
        <h1 className="error__title">Oops!</h1>
        <p>The page you were looking for is not found.</p>
        <Button text={'Back to homepage'} url={'/'} />
      </div>
    </div>
  </main>
);
