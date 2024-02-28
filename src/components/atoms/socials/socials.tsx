import { useTranslation } from 'react-i18next';
import './socials.scss';
import { useContext } from 'react';
import { BrandContext } from '../../../brand';

type SocialsProps = {
  doi: string,
  title: string
};

export const Socials = ({
  doi, title,
}: SocialsProps) => {
  const brand = useContext(BrandContext);
  const { t } = useTranslation();
  const doiUrl = `https://doi.org/${doi}`;
  const encodedTitle = encodeURIComponent(title);
  const twitterEncodedTitle = encodeURIComponent(t('In {{twitter_handle}}: ', { twitter_handle: brand.twitterHandle }));
  const encodedUrl = encodeURIComponent(doiUrl);
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${twitterEncodedTitle}${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?title=${encodedTitle}&url=${encodedUrl}`;
  const redditUrl = `https://reddit.com/submit/?title=${encodedTitle}&url=${encodedUrl}`;
  const mastodonUrl = `https://toot.kytta.dev/?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <ul className="socials-sharers">
      <li>
        <a className="socials-sharer email" href={emailUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Email">
          Email
        </a>
      </li>
      { brand.twitterHandle && <li>
        <a className="socials-sharer twitter" href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Twitter">
          Twitter
        </a>
      </li> }
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
        <a className="socials-sharer mastodon" href={mastodonUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Mastodon via Toot">
          Mastodon
        </a>
      </li>
    </ul>
  );
};
