import { expect, test } from '@playwright/test';

test.describe('citations', () => {
  test('can download a bibtex citation', async ({ request }) => {
    const response = await request.get('http://localhost:3001/reviewed-preprints/123.bib');
    expect(response.ok()).toBeTruthy();
    const headers = response.headers();
    expect(headers['content-type']).toBe('application/x-bibtex');
    expect(headers['content-disposition']).toBe('attachment; filename=123.bib');
    const responseBody = await response.text();
    expect(responseBody).toContain('A study of world domination by genetically enhanced mice.');
  });

  test('can download a ris citation', async ({ request }) => {
    const response = await request.get('http://localhost:3001/reviewed-preprints/123.ris');
    expect(response.ok()).toBeTruthy();
    const headers = response.headers();
    expect(headers['content-type']).toBe('application/x-research-info-systems');
    expect(headers['content-disposition']).toBe('attachment; filename=123.ris');
    const responseBody = await response.text();
    expect(responseBody).toContain('A study of world domination by genetically enhanced mice.');
  });
});
