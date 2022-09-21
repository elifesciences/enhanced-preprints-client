import './site-header.scss';
import logo from './elife-logo.svg';

export const SiteHeader = (): JSX.Element => (
  <div className="site-header">
    <img src={logo} className="site-header__logo" alt="eLife logo" />
  </div>
);
