describe('getCanonicalUrl', () => {
  it.todo('uses the manuscript ID in the final segment of canonical URL');
  describe('when the article version is not a version of record', () => {
    it.todo('should use the "/reviewed-preprints" prefix');
  });

  describe('when the article version is a version of record', () => {
    it.todo('should use the "/articles" prefix');
  });

  describe('when a canonical domain is configured', () => {
    it.todo('should return a full url with protocol and domain');
  });
});
