import { ContentSchema } from './content';
import automation85111v1 from '../../data/automation/85111/v1/payload.json';
import automationBiophysicsColab from '../../data/automation/biophysics-colab-111111/v1/payload.json';
import wiremock15102v1 from '../../wiremock/files/preprints/15102v1.json';
import wiremock15102v3 from '../../wiremock/files/preprints/15102v3.json';
import wiremock85111v1 from '../../wiremock/files/preprints/85111v1.json';

// Guards against reintroducing the perf regression this schema used to have:
// building each content-node variant with z.intersection(...) rather than a real
// z.object(), so z.union() had to fully re-validate the recursive `content` subtree
// for every one of the ~19 mismatched candidates before failing on the type check.
// Measured on these exact fixtures, that cost 50-772ms per parse; the
// z.discriminatedUnion rewrite (O(1) lookup on `type`) parses the same data in 1-3ms.
// MAX_PARSE_MS sits well below the old regression range and well above normal
// variance, so this fails loudly if that cost ever comes back.
const MAX_PARSE_MS = 100;

type ArticleEnvelope = { article?: { article?: { content?: unknown }, content?: unknown } };

const getContent = (data: ArticleEnvelope) => {
  const article = data.article?.article ?? data.article;
  return article?.content;
};

const fixtures = [
  { name: '85111v1 (wiremock)', data: wiremock85111v1 as ArticleEnvelope },
  { name: '15102v1 (wiremock)', data: wiremock15102v1 as ArticleEnvelope },
  { name: '15102v3 (wiremock)', data: wiremock15102v3 as ArticleEnvelope },
  { name: '85111v1 (automation)', data: automation85111v1 as ArticleEnvelope },
  { name: 'biophysics-colab-111111v1 (automation)', data: automationBiophysicsColab as ArticleEnvelope },
];

describe('ContentSchema parse performance', () => {
  it.each(fixtures)('parses $name well within the pre-discriminatedUnion regression range', ({ data }) => {
    const content = getContent(data);
    expect(content).toBeDefined();

    const start = performance.now();
    const result = ContentSchema.parse(content);
    const durationMs = performance.now() - start;

    console.log({ durationMs });
    expect(result).toBeDefined();
    expect(durationMs).toBeLessThan(MAX_PARSE_MS);
  });
});
