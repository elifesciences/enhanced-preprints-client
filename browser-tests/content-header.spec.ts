import { test } from '@playwright/test';
import { ContentHeader } from './page-objects/content-header';

test.describe('content header', () => {
  let contentHeader: ContentHeader;
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/reviewed-preprints/123');
    contentHeader = new ContentHeader(page);
  });

  test('content header has title and links to intro page', async () => {
    await contentHeader.assertTitle('Tonight we take over the world!');
  });

  test('content header has correct msas', async () => {
    await contentHeader.assertMSAExists('World Domination');
    await contentHeader.assertMSAExists('Pondering');
    await contentHeader.assertMSAExists('Narf!');
  });

  test('content header has correct authors', async () => {
    await contentHeader.assertAuthorExists('Brain');
    await contentHeader.assertAuthorExists('Pinky Mouse');
  });

  test('content header has correct institutions', async () => {
    await contentHeader.assertInstitutionExists('Acme LabsNew York'); // formatted this way due to css before adding space and comma
  });

  test('content header has correct doi', async () => {
    await contentHeader.assertDOI('10.7554/eLife.123.1');
  });

  test('content header displays correct number of authors', async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000, });
    await contentHeader.assertVisibleAuthorCount(10);
    
    await page.setViewportSize({ width: 767, height: 1000, });
    await contentHeader.assertVisibleAuthorCount(3);
  });
});
