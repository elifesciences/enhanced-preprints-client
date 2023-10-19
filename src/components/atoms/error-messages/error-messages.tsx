import './error-messages.scss';
import Image from 'next/image';
import MissingImage from '../../../images/errors/404.svg';

export const ErrorMessages = () => (
  <div className="error-container">
    <Image src={MissingImage} width="64" height="157" alt="We're on it" className="error__icon" />
    <h2 className="error__title">We&apos;re looking into it</h2>
    <p className="error__message">The information you&apos;re looking for isn&apos;t available right now but we&apos;re working to fix it. Please try again later and thank you for your patience.</p>
  </div>
);
