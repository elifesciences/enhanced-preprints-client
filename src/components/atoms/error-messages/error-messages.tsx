import './error-messages.scss';
import Image from 'next/image';
import MissingImage from '../../../images/errors/404.svg';

export const ErrorMessages = (): JSX.Element => (
 <div className="error_container">
  <div className="error">
    <Image src={MissingImage} width="64" height="157" alt="Oops" className="error__icon" />
    <h2>We're on it</h2>
    <p>The info you're looking for isn't available right now, and that's on us. Please try again later and thank you for your patience while we fix this.</p>
  </div>
</div>
);
