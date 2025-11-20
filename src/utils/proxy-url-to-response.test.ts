import EventEmitter from 'events';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { ReadableStream } from 'stream/web';
import { proxyUrlToResponse } from './proxy-url-to-response';

describe('proxyUrlToResponse', () => {
  const arbitraryUrl = 'arbitrary url';
  const data = 'arbitrary data';
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
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  describe('when the url returns status 200', () => {
    type DefaultUpstreamResponse = {
      ok: boolean,
      body: ReadableStream,
      headers: Headers,
    };
    let defaultUpstreamResponse: DefaultUpstreamResponse;
    beforeEach(() => {
      defaultUpstreamResponse = {
        ok: true,
        body: ReadableStream.from([data]),
        headers: new Headers({
          'x-client-caching-unrelated-header': 'arbitrary header value',
        }),
      };

      (fetch as jest.Mock).mockResolvedValueOnce(defaultUpstreamResponse);
    });
    it('copies appropriate request headers related to client caching to the upstream request', async () => {
      req.headers = { accept: 'application/pdf' };

      await proxyUrlToResponse(arbitraryUrl, req, res, 'arbitrary filename', 'arbitrary canonical url');

      expect(fetch).toHaveBeenCalledWith(arbitraryUrl, { headers: req.headers });
    });
    it.todo('does not copy request headers unrelated to client caching to the upstream request');
    it.todo('copies appropriate upstream response headers related to client caching to the response');
    it('does not copy upstream response headers unrelated to client caching to the response', async () => {
      await proxyUrlToResponse(arbitraryUrl, req, res, 'arbitrary filename', 'arbitrary canonical url');

      expect(res.getHeader('x-client-caching-unrelated-header')).toBeUndefined();
    });

    it('sets the response status to 200 and streams the data', async () => {
      await proxyUrlToResponse(arbitraryUrl, req, res, 'arbitrary filename', 'arbitrary canonical url');

      expect(res.statusCode).toBe(200);
      // eslint-disable-next-line no-underscore-dangle
      expect(res._getBuffer().toString()).toBe(data);
    });

    describe('when given a canonical URL', () => {
      it('sets the link header with canonical-url on the response', async () => {
        const canonicalUrl = 'canonical url';
        await proxyUrlToResponse('arbitrary url', req, res, 'arbitrary filename', canonicalUrl);

        expect(res.getHeader('link')).toBe(`<${canonicalUrl}>; rel="canonical"`);
      });
    });

    describe('when given the filename to apply to the downloaded file', () => {
      it('sets the content-disposition header on the response', async () => {
        const filename = 'filename.txt';
        const contentDispositionHeader = `attachment; filename="${filename}"`;

        await proxyUrlToResponse('arbitrary url', req, res, filename, 'arbitrary string');

        expect(res.getHeader('content-disposition')).toBe(contentDispositionHeader);
      });
    });
  });
});
