import './sign-up.scss';
import { Button } from '../../atoms/button/button';

export const SignUp = () => (
  <section className="email-cta">
    <div className="email-cta__container">
      <header className="email-cta__header">
        <h2 className="email-cta__header_text">Be the first to read new articles from eLife</h2>
      </header>

      <Button text={'Sign up for email alerts'} url={'/content-alerts'} />

      <div className="email-cta__privacy">
        <a className="email-cta__privacy_link" href="/privacy">Privacy notice</a>
      </div>
    </div>
  </section>
);
