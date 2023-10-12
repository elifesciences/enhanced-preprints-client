import { Author } from '../../../types';
import './copyright.scss';

type CopyrightProps = {
  license?: string,
  publishedYear?: number,
  authors?: Author[],
};

export const Copyright = ({ license, publishedYear, authors }: CopyrightProps) => {
  let copyrightText;
  let hasCopyright = false;
  let authorName = '';

  if (license?.includes('/by/')) {
    copyrightText = (
      <>
        This article is distributed under the terms of the <a href={license}>Creative Commons Attribution License</a>, which
        permits unrestricted use and redistribution provided that the original author and source are credited.
      </>
    );

    hasCopyright = true;
  } else if (license?.includes('/zero/')) {
    copyrightText = (
      <>
        This is an open-access article, free of all copyright, and may be freely reproduced, distributed, transmitted, modified, built upon, or
        otherwise used by anyone for any lawful purpose. The work is made available under the <a href={license}>Creative Commons CC0 public domain dedication</a>.
      </>
    );
  }

  if (authors?.length) {
    if (authors.length < 3) {
      authorName = authors.map((author) => {
        if (author.type === 'Organization') {
          return author.name ?? '';
        }

        return `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''} `;
      }).join(' & ');
    } else {
      if (authors[0].type === 'Organization') {
        authorName = authors[0].name ?? '';
      } else {
        authorName = (authors[0].familyNames ?? []).join(' ');
      }

      authorName += ' et al.';
    }
  }

  return (
    <>
      {copyrightText &&
        <div id="copyright" className="copyright">
          <h2>Copyright</h2>
          {hasCopyright && <p>{publishedYear && `© ${publishedYear},`}{authorName && ` ${authorName}`}</p>}
          <p>{copyrightText}</p>
        </div>}
    </>
  );
};
