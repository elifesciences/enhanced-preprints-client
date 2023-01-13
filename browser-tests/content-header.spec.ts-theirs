import { test } from '@playwright/test';
import { ContentHeader } from './page-objects/content-header';

test.describe('content header', () => {
  let contentHeader: ContentHeader;
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    await page.goto('http://localhost:3001/reviewed-preprints/123');
    contentHeader = new ContentHeader(page);
  });

  test('has title and links to intro page', async () => {
    await contentHeader.assertTitle('Tonight we take over the world!');
  });

  test('has correct msas', async () => {
    await contentHeader.assertMSAExists('World Domination');
    await contentHeader.assertMSAExists('Pondering');
    await contentHeader.assertMSAExists('Narf!');
  });

  test('has correct authors', async () => {
    await contentHeader.assertAuthorExists('Brain');
    await contentHeader.assertAuthorExists('Pinky Mouse');
  });

  test('has correct institutions', async () => {
    await contentHeader.assertInstitutionExists('Acme LabsNew York'); // formatted this way due to css before adding space and comma
  });

  test('has correct doi', async () => {
    await contentHeader.assertDOI('10.7554/eLife.123.1');
  });

  test('displays correct number of authors', async ({ page }) => {
    await contentHeader.assertVisibleAuthorCount(10);

    await page.setViewportSize({ width: 767, height: 1000 });
    await contentHeader.assertVisibleAuthorCount(3);
  });

  test('displays show more for author list', async ({ page }) => {
    await contentHeader.assertVisibleAuthorCount(10);
    await contentHeader.assertAuthorShowMore(1);

    await page.setViewportSize({ width: 767, height: 1000 });
    await contentHeader.assertAuthorShowMore(8, true);
  });

  test('displays all authors when show more is clicked', async () => {
    await contentHeader.assertVisibleAuthorCount(10);
    await contentHeader.toggleAuthorExpansion();
    await contentHeader.assertVisibleAuthorCount(11);
  });

  test('displays fewer authors when show less is clicked', async () => {
    await contentHeader.toggleAuthorExpansion();
    await contentHeader.assertVisibleAuthorCount(11);

    await contentHeader.assertAuthorShowLess();
    await contentHeader.toggleAuthorExpansion();
    await contentHeader.assertVisibleAuthorCount(10);
  });
});
