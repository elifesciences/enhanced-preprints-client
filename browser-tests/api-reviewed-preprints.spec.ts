import { test, expect } from '@playwright/test';

test('reviewed preprints api listing', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints');
  expect(response.ok()).toBeTruthy();
  const responseJson = await response.json();
  expect(responseJson.total).toBe(1);
  expect(responseJson.items[0].id).toBe('123');
  expect(responseJson.items[0].doi).toBe('10.1101/123456');
  expect(responseJson.items[0].title).toBe('Tonight we take over the world!');
});

test('reviewed preprints api item found', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/reviewed-preprints/123');
  expect(response.ok()).toBeTruthy();
  const responseJson = await response.json();
  expect(responseJson.id).toBe('123');
  expect(responseJson.doi).toBe('10.1101/123456');
  expect(responseJson.title).toBe('Tonight we take over the world!');
  expect(responseJson.indexContent).toContain('On the subject of sidekicks');
});

test('reviewed preprints api item unknown', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/retoBeTruthyviewed-preprints/unknown');
  expect(response.status()).toEqual(404);
});
