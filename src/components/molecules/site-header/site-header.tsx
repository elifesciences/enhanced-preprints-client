import './site-header.scss';
import logo from './elife-logo.svg';

export const SiteHeader = ({ additionalClasses = [] } : { additionalClasses?: string[] }): JSX.Element => (
  <div className={additionalClasses.concat(['site-header']).join(' ')}>
    <img src={logo} className="site-header__logo" alt="eLife logo" />
  </div>
);
