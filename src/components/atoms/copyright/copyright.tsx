import './copyright.scss';

type CopyrightProps = {
  license?: string,
};

export const Copyright = ({ license }: CopyrightProps) => {
  let text = 'Default Text';
  let hasCopyright = false;

  if (license?.length && license.includes('/by/')) {
    text = `This article is distributed under the terms of the <a href=${license}>Creative Commons Attribution License</a>, which 
    permits unrestricted use and redistribution provided that the original author and source are credited.`;

    hasCopyright = true;
  } else if (license?.length && license.includes('/zero/')) {
    text = `This is an open-access article, free of all copyright, and may be freely reproduced, distributed, transmitted, modified, 
    built upon, or otherwise used by anyone for any lawful purpose. The work is made available under the <a href=${license}>
    Creative Commons CC0 public domain dedication</a>.`;
  }

  const renderHTML = () => ({ __html: text });

  return (
    <div className="copyright">
      <h3>Copyright</h3>
      {hasCopyright && <p>© 2023, Blanch-Lombarte et al.</p>}
      <p dangerouslySetInnerHTML={renderHTML()}></p>
    </div>
  );
};
