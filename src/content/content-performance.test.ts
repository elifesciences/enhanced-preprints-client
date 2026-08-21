import { ContentSchema } from './content';
import automation85111v1 from '../../data/automation/85111/v1/payload.json';
import automationBiophysicsColab from '../../data/automation/biophysics-colab-111111/v1/payload.json';
import wiremock15102v1 from '../../wiremock/files/preprints/15102v1.json';
import wiremock15102v3 from '../../wiremock/files/preprints/15102v3.json';
import wiremock85111v1 from '../../wiremock/files/preprints/85111v1.json';

const MAX_PARSE_MS = 10;

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

    expect(result).toBeDefined();
    expect(durationMs).toBeLessThan(MAX_PARSE_MS);
  });
});
