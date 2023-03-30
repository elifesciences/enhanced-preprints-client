import './socials.scss';
import { useState } from 'react';
import { Button } from '../button/button';

type Props = {
  doi: string,
  title: string
};

export const Socials = ({
  doi, title,
}: Props): JSX.Element => {
  const doiUrl = `https://doi.org/${doi}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(doiUrl);
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?title=${encodedTitle}&url=${encodedUrl}`;
  const redditUrl = `https://reddit.com/submit/?title=${encodedTitle}&url=${encodedUrl}`;

  const [showMastodonInputs, setShowMastodonInputs] = useState(false);
  const [mastadonAddress, setMastadonAddress] = useState<string>();

  return (
    <div className="socials-container">
      <ul className="socials-sharers">
        <li>
          <a className="socials-sharer email" href={emailUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Email">
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
        <li>
          <a className="socials-sharer mastadon" target="_blank" rel="noopener noreferrer" aria-label="Share by Reddit" onClick={() => setShowMastodonInputs(!showMastodonInputs)}>
            Mastadon
          </a>
        </li>
      </ul>
      { showMastodonInputs &&
        <div className="socials-mastadon">
          <input className="socials-mastadon__input" placeholder="Mastadon URL" defaultValue={mastadonAddress ?? ''} onInput={(e) => setMastadonAddress(e.currentTarget.value)}/>
          <a className="button button--action" target="_blank" rel="noopener noreferrer" href={`https://${mastadonAddress}/share?text=${encodeURIComponent(title)}%20${encodeURIComponent(window.location.href)}`} aria-label="Share by Mastodon">Share</a>
        </div>
      }
    </div>
  );
};
