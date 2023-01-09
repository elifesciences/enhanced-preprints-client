import { test } from '@playwright/test';
import { ContentHeader } from './page-objects/content-header';

test.describe('content header', () => {
  let contentHeader: ContentHeader;
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/reviewed-preprints/123');
    contentHeader = new ContentHeader(page);
  });

  test('homepage has title and links to intro page', async () => {
    await contentHeader.assertTitle('Tonight we take over the world!');
  });

  test('homepage has correct msas', async () => {
    await contentHeader.assertMSAExists('World Domination');
    await contentHeader.assertMSAExists('Pondering');
    await contentHeader.assertMSAExists('Narf!');
  });

  test('homepage has correct authors', async () => {
    await contentHeader.assertAuthorExists('Brain');
    await contentHeader.assertAuthorExists('Pinky Mouse');
  });

  test('homepage has correct institutions', async () => {
    await contentHeader.assertInstitutionExists('Acme LabsNew York'); // formatted this way due to css before adding space and comma
  });

  test('homepage has correct doi', async () => {
    await contentHeader.assertDOI('10.7554/eLife.123.1');
  });
});
