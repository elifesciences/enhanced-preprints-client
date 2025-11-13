describe('getCanonicalUrl', () => {
  describe('when the article version is not a version of record', () => {
    it.todo('uses the "/reviewed-preprints" prefix');
    it.todo('uses the manuscript ID in the final segment of canonical URL');

    describe('when a canonical domain is configured', () => {
      it.todo('returns a full url with protocol and domain');
    });
  });

  describe('when the article version is a version of record', () => {
    it.todo('uses the "/articles" prefix');

    it.todo('uses the manuscript ID in the final segment of canonical URL');

    describe('when a canonical domain is configured', () => {
      it.todo('returns a full url with protocol and domain');
    });
  });
});
