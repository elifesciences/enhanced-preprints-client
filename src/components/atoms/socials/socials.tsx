import './socials.scss';

type Props = {
  emailUrl: string,
  facebookUrl: string,
  twitterUrl: string,
  linkedinUrl: string,
  redditUrl: string,
};

export const Socials = ({
  emailUrl, twitterUrl, facebookUrl, linkedinUrl, redditUrl,
}: Props): JSX.Element => (
  <div className="socials-container">
    <ul className="socials-sharers">
      <li>
        <a className="socials-sharer email" href={ emailUrl } target="_blank" rel="noopener noreferrer" aria-label="Share by Email">
          Email
        </a>
      </li>
      <li>
        <a className="socials-sharer twitter" href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Twitter">
          Twitter
        </a>
      </li>
      <li>
        <a className="socials-sharer facebook" href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Facebook">
          Facebook
        </a>
      </li>
      <li>
        <a className="socials-sharer linkedin" href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by LinkedIn">
          LinkedIn
        </a>
      </li>
      <li>
        <a className="socials-sharer reddit" href={redditUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Reddit">
          Reddit
        </a>
      </li>
    </ul>
  </div>
);
