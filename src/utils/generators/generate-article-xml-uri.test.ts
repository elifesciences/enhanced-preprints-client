import { generateArticleXmlUri } from './generate-article-xml-uri';

describe('generateArticleXmlUri', () => {
  const msid = 'arbitrarymsid';
  const versionIdentifier = 'arbitraryVersion';
  const articleXmlUri = generateArticleXmlUri(msid, versionIdentifier);
  it('includes article manuscript ID', () => {
    expect(articleXmlUri).toContain(msid);
  });
  it('includes article version', () => {
    expect(articleXmlUri).toContain(versionIdentifier);
  });
  it('the basename is article-transformed.xml', () => {
    expect(articleXmlUri.endsWith('article-transformed.xml')).toBe(true);
  });
});
