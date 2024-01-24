import './footer-main.scss';

/* eslint-disable max-len */

export const FooterMain = () => (
  <footer className="site-footer">

    <div className="site-footer__container">

      <div className="grid-cell">

        <nav className="footer-navigation">
          <ul className="footer-navigation__list">
            <li className="footer-navigation__list_item">
              <a href="#" className="footer-navigation__list_link">About</a>
            </li>
            <li className="footer-navigation__list_item">
              <a href="#" className="footer-navigation__list_link">Privacy notice</a>
            </li>
            <li className="footer-navigation__list_item">
              <a href="#" className="footer-navigation__list_link">For the press</a>
            </li>
            <li className="footer-navigation__list_item">
              <a href="#" className="footer-navigation__list_link">Terms and conditions</a>
            </li>
          </ul>
        </nav>

      </div>

      <div className="grid-cell">

        <div className="site-smallprint">
          Contact: <a href="mailto:enquires@sciencecolab.org">enquires@sciencecolab.org</a>
        </div>

        <div className="social-links" aria-label="Social media links for Biophysics Colab">
          <ul className="social-links__list">
            <li className="social-links__list_item">
              <a href="https://www.linkedin.com/company/elife-sciences-publications-ltd"
                 className="social-links__list_link" aria-label="LinkedIn">
                <svg width="28" height="28">
                  <path
                    d="M22.3830154,22.3830154 L18.8384,22.3830154 L18.8384,16.832 C18.8384,15.5083077 18.8147692,13.8043077 16.9948308,13.8043077 C15.1486769,13.8043077 14.8662154,15.2465231 14.8662154,16.7356308 L14.8662154,22.3826462 L11.3216,22.3826462 L11.3216,10.9675077 L14.7244308,10.9675077 L14.7244308,12.5275077 L14.7720615,12.5275077 C15.465918,11.3411519 16.7560586,10.632589 18.1294769,10.6835692 C21.7220923,10.6835692 22.3844923,13.0466462 22.3844923,16.1208615 L22.3830154,22.3830154 Z M7.32209231,9.4071385 C6.1860511,9.40734236 5.26494244,8.48656431 5.26473849,7.3505231 C5.26453461,6.21448189 6.18531266,5.29337322 7.32135387,5.29316926 C8.45739508,5.29296537 9.37850375,6.21374341 9.37870773,7.34978462 C9.37880563,7.89533086 9.16218215,8.41857185 8.77649194,8.80440054 C8.39080174,9.19022923 7.86763855,9.40704054 7.32209231,9.4071385 M9.0944,22.3830154 L5.54609231,22.3830154 L5.54609231,10.9675077 L9.0944,10.9675077 L9.0944,22.3830154 Z M24.1501538,2.00147692 L3.76492308,2.00147692 C2.80147497,1.99060441 2.01138912,2.76234691 1.99963077,3.72578462 L1.99963077,24.1955692 C2.01098655,25.1594712 2.80100881,25.9319778 3.76492308,25.9218636 L24.1501538,25.9218636 C25.115975,25.9338359 25.9090911,25.1613738 25.9224615,24.1955692 L25.9224615,3.72430769 C25.9086895,2.75896671 25.1155091,1.98726833 24.1501538,1.9998447"
                    id="Path_2520" fill="#212121" fillRule="nonzero"></path>
                </svg>
              </a>
            </li>
            <li className="social-links__list_item">
              <a href="https://twitter.com/elife" className="social-links__list_link" aria-label="Twitter">
                <svg width="28" height="28">
                  <path
                    d="M24.8,7.6781 C24.0053,8.0309 23.1512,8.2685 22.2548,8.3756 C23.1701,7.8275 23.873,6.959 24.2033,5.924 C23.3474,6.4316 22.3988,6.8006 21.389,6.9995 C20.5817,6.1382 19.4288,5.6 18.1544,5.6 C15.2933,5.6 13.1909,8.2694 13.8371,11.0405 C10.1552,10.856 6.89,9.092 4.7039,6.4109 C3.5429,8.4026 4.1018,11.0081 6.0746,12.3275 C5.3492,12.3041 4.6652,12.1052 4.0685,11.7731 C4.0199,13.826 5.4914,15.7466 7.6226,16.1741 C6.9989,16.3433 6.3158,16.3829 5.621,16.2497 C6.1844,18.0101 7.8206,19.2908 9.761,19.3268 C7.898,20.7875 5.5508,21.44 3.2,21.1628 C5.1611,22.4201 7.4912,23.1536 9.9932,23.1536 C18.221,23.1536 22.8695,16.2047 22.5887,9.9722 C23.4545,9.3467 24.206,8.5664 24.8,7.6781 Z"
                    id="Path" fill="#000000" fillRule="nonzero"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="site-smallprint">
          Subject to a <a href="#">Creative Commons Attribution license</a> except where otherwise noted.
        </div>

        <div className="site-smallprint">
          &copy;
          <time>2024</time>
          Science Colab
        </div>

      </div>

    </div>
  </footer>
);
