import { test, expect } from '@playwright/test';

test('reviewed preprints api listing', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints');
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers['content-type']).toBe('application/vnd.elife.reviewed-preprint-list+json; version=1');
  expect(headers['cache-control']).toBe('max-age=300, public, stale-if-error=86400, stale-while-revalidate=300');

  const headerVary = headers.vary.split(', ');
  expect(headerVary).toContain('Accept');
  expect(headerVary).toContain('Authorization');

  const responseJson = await response.json();
  expect(responseJson.total).toBe(1);
  expect(responseJson.items[0].id).toBe('123');
  expect(responseJson.items[0].doi).toBe('10.1101/123456');
  expect(responseJson.items[0].title).toBe('Tonight we take over the world!');
});

test('reviewed preprints api item found', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints/123');
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers['content-type']).toBe('application/vnd.elife.reviewed-preprint-item+json; version=1');
  expect(headers['cache-control']).toBe('max-age=300, public, stale-if-error=86400, stale-while-revalidate=300');

  const headerVary = headers.vary.split(', ');
  expect(headerVary).toContain('Accept');
  expect(headerVary).toContain('Authorization');

  const responseJson = await response.json();
  expect(responseJson.id).toBe('123');
  expect(responseJson.doi).toBe('10.1101/123456');
  expect(responseJson.title).toBe('Tonight we take over the world!');
  expect(responseJson.indexContent).toContain('On the subject of sidekicks');
  expect(responseJson.indexContent).toContain('Brain Pinky MouseSlowpoke RodreigezSylvester J PussycatElmer FuddYosemite SamFogghorn LeghornPepe Le PewPorky PigSpeedy GonzalesBugs Bunny');
});

test('reviewed preprints api item unknown', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints/unknown');
  expect(response.status()).toEqual(404);

  const headers = response.headers();
  expect(headers['content-type']).toBe('application/json');
  expect(headers['cache-control']).toBe('must-revalidate, no-cache, private');

  const headerVary = headers.vary.split(', ');
  expect(headerVary).toContain('Accept');
  expect(headerVary).toContain('Authorization');
});
