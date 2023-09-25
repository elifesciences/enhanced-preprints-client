import { Author } from '../../../types';
import './copyright.scss';

type CopyrightProps = {
  license?: string,
  year?: number,
  author?: Author,
};

export const Copyright = ({ license, year, author }: CopyrightProps) => {
  let copyrightText = (
    <>
      This article is distributed under the terms of the <a href={license}>Creative Commons Attribution License</a>, which
      permits unrestricted use and redistribution provided that the original author and source are credited.
    </>
  );

  let hasCopyright = true;
  let authorName: string | undefined;

  if (license?.length && license.includes('/zero/')) {
    copyrightText = (
      <>
        This is an open-access article, free of all copyright, and may be freely reproduced, distributed, transmitted, modified, built upon, or
        otherwise used by anyone for any lawful purpose. The work is made available under the <a href={license}>Creative Commons CC0 public domain dedication</a>.
      </>
    );

    hasCopyright = false;
  }

  if (author) {
    if (author.type === 'Organization') {
      authorName = author.name;
    } else {
      authorName = `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''}`;
    }
  }

  return (
    <div className="copyright">
      <h3>Copyright</h3>
      {hasCopyright && <p>{`© ${year ?? new Date().getFullYear()}`}{authorName && `, ${authorName} et al.`}</p>}
      <p>{copyrightText}</p>
    </div>
  );
};
