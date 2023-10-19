import { test, expect } from '@playwright/test';

test('robots show preview urls', async ({ request }) => {
  const response = await request.get('http://localhost:3001/robots.txt');
  expect(response.ok()).toBeTruthy();

  const robotsResponse = await response.text();
  expect(robotsResponse).toContain('Disallow: /previews/');
  expect(robotsResponse).toContain('Disallow: /preview/');
});
