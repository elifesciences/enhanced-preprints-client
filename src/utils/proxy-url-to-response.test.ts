describe('proxyUrlToResponse', () => {
  describe('when the url returns status 200', () => {
    it.todo('copies appropriate request headers related to client caching to the upstream request');
    it.todo('does not copy request headers unrelated to client caching to the upstream request');
    it.todo('copies appropriate upstream response headers related to client caching to the response');
    it.todo('does not copy upstream response headers unrelated to client caching to the response');
    it.todo('sets the response status to 200 and streams the data');
  });

  describe('when given a canonical URL', () => {
    it.todo('sets the link header with canonical-url on the response');
  });

  describe('when given the filename to apply to the downloaded file', () => {
    it.todo('sets the content-disposition header on the response');
  });
});
