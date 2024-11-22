import { test, expect } from '@playwright/test';

test('reviewed preprints api listing', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints?x-epp-tenant-id=elife');
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers['content-type']).toBe('application/vnd.elife.reviewed-preprint-list+json; version=1');
  expect(headers['cache-control']).toBe('max-age=300, public, stale-if-error=86400, stale-while-revalidate=300');

  const headerVary = headers.vary.split(', ');
  expect(headerVary).toContain('Accept');
  expect(headerVary).toContain('Authorization');

  const responseJson = await response.json();
  expect(responseJson.total).toBe(2);
  expect(responseJson.items[0].id).toBe('85111');
  expect(responseJson.items[0].version).toBe(2);
  expect(responseJson.items[0].doi).toBe('10.1101/2022.11.08.515698');
  expect(responseJson.items[0].title).toBe('The locus coeruleus broadcasts prediction errors across the cortex to promote sensorimotor plasticity');
  expect(responseJson.items[0].elifeAssessment).toStrictEqual({
    title: 'eLife assessment',
    content: [
      {
        type: 'paragraph',
        // eslint-disable-next-line max-len
        text: 'This important study provides convincing evidence that locus coeruleus is activated during visuomotor mismatches. Gain of function optogenetic experiments complement this evidence and indicate that locus coeruleus could be involved in the learning process that enables visuomotor predictions. This study, therefore, sets the groundwork for the circuit dissection of predictive signals in the visual cortex. Loss-of-function experiments would strengthen the evidence of the involvement of locus coeruleus in prediction learning. These results will be of interest to systems neuroscientists.',
      },
    ],
    id: 'sa2',
    doi: '10.7554/eLife.85111.2.sa2',
    significance: [
      'important',
    ],
    strength: [
      'convincing',
    ],
  });
});

test('reviewed preprints api item found', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints/85111?x-epp-tenant-id=elife');
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers['content-type']).toBe('application/vnd.elife.reviewed-preprint+json; version=1');
  expect(headers['cache-control']).toBe('max-age=300, public, stale-if-error=86400, stale-while-revalidate=300');

  const headerVary = headers.vary.split(', ');
  expect(headerVary).toContain('Accept');
  expect(headerVary).toContain('Authorization');

  const responseJson = await response.json();
  expect(responseJson.id).toBe('85111');
  expect(responseJson.version).toBe(2);
  expect(responseJson.doi).toBe('10.1101/2022.11.08.515698');
  expect(responseJson.title).toBe('The locus coeruleus broadcasts prediction errors across the cortex to promote sensorimotor plasticity');
  expect(responseJson.elifeAssessment).toStrictEqual({
    title: 'eLife assessment',
    content: [
      {
        type: 'paragraph',
        // eslint-disable-next-line max-len
        text: 'This important study provides convincing evidence that locus coeruleus is activated during visuomotor mismatches. Gain of function optogenetic experiments complement this evidence and indicate that locus coeruleus could be involved in the learning process that enables visuomotor predictions. This study, therefore, sets the groundwork for the circuit dissection of predictive signals in the visual cortex. Loss-of-function experiments would strengthen the evidence of the involvement of locus coeruleus in prediction learning. These results will be of interest to systems neuroscientists.',
      },
    ],
    id: 'sa2',
    doi: '10.7554/eLife.85111.2.sa2',
    significance: [
      'important',
    ],
    strength: [
      'convincing',
    ],
  });
  expect(responseJson.indexContent).toContain('Through experience with the world, brains learn to predict the sensory feedback');
  expect(responseJson.indexContent).toContain('Rebecca Jordan, Georg B. Keller');
});

test('reviewed preprints api item unknown', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints/unknown?x-epp-tenant-id=elife');
  expect(response.status()).toEqual(404);

  const headers = response.headers();
  expect(headers['content-type']).toBe('application/json');
  expect(headers['cache-control']).toBe('must-revalidate, no-cache, private');

  const headerVary = headers.vary.split(', ');
  expect(headerVary).toContain('Accept');
  expect(headerVary).toContain('Authorization');
});
