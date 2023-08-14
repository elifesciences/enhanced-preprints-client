import './error-messages.scss';
import Image from 'next/image';
import MissingImage from '../../../images/errors/404.svg';

export const ErrorMessages = (): JSX.Element => (
 <div className="error_container">
  <Image src={MissingImage} width="64" height="157" alt="We're on it" className="error__icon" />
  <h2 className="error__title">We&apos;re on it</h2>
  <p className="error__message">The info you&apos;re looking for isn&apos;t available right now, and that&apos;s on us. Please try again later and thank you for your patience while we fix this.</p>
</div>
);

