import EventEmitter from 'events';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { ReadableStream } from 'stream/web';
import { proxyUrlToResponse } from './proxy-url-to-response';

describe('proxyUrlToResponse', () => {
  let req: NextApiRequest;
  let res: NextApiResponse & ReturnType<typeof createResponse>;

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    req = createRequest();
    res = createResponse({
      eventEmitter: EventEmitter,
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: ReadableStream.from(['']),
      headers: new Headers(),
    });
  });

  describe('when the url returns status 200', () => {
    it.todo('copies appropriate request headers related to client caching to the upstream request');
    it.todo('does not copy request headers unrelated to client caching to the upstream request');
    it.todo('copies appropriate upstream response headers related to client caching to the response');
    it.todo('does not copy upstream response headers unrelated to client caching to the response');
    it.todo('sets the response status to 200 and streams the data');
  });

  describe('when given a canonical URL', () => {
    it('sets the link header with canonical-url on the response', async () => {
      const canonicalUrl = 'canonical url';
      await proxyUrlToResponse('arbitrary url', res, req, 'arbitrary filename', canonicalUrl);

      expect(res.getHeader('link')).toBe(`<${canonicalUrl}>; rel="canonical"`);
    });
  });

  describe('when given the filename to apply to the downloaded file', () => {
    it('sets the content-disposition header on the response', async () => {
      const filename = 'filename.txt';
      const contentDispositionHeader = `attachment; filename="${filename}"`;

      await proxyUrlToResponse('arbitrary url', res, req, filename, 'arbitrary string');

      expect(res.getHeader('content-disposition')).toBe(contentDispositionHeader);
    });
  });
});
