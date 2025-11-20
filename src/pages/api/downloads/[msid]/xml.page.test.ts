describe('download XML handler', () => {
  describe('Handling unexpected types passed by next.js', () => {
    it.todo('returns 400 if nextjs passes a non-string query msid');
  });

  describe('handling XML requests', () => {
    describe('when the msid is invalid', () => {
      it.todo('returns 404');
    });

    describe('when the msid is valid', () => {
      it.todo('returns 200 with the data');
      it.todo('sets a canonical url');
      it.todo('sets a header to advise browsers to download the file');
    });
  });

  describe('handling unexpected errors', () => {
    describe('when an unexpected error occurs', () => {
      it.todo('returns status 502');
    });
  });
});
