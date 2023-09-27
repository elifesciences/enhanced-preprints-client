import { Author } from '../../../types';
import './copyright.scss';

type CopyrightProps = {
  license?: string,
  publishedYear?: number,
  author?: Author,
};

export const Copyright = ({ license, publishedYear, author }: CopyrightProps) => {
  let copyrightText;
  let hasCopyright = false;
  let authorName: string | undefined;

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

  if (author) {
    if (author.type === 'Organization') {
      authorName = author.name;
    } else {
      authorName = `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''}`;
    }
  }

  return (
    <>
      {copyrightText &&
        <div id="copyright" className="copyright">
          <h3>Copyright</h3>
          {hasCopyright && <p>{publishedYear && `© ${publishedYear},`}{authorName && ` ${authorName} et al.`}</p>}
          <p>{copyrightText}</p>
        </div>}
    </>
  );
};
