import { test } from '@playwright/test';
import { ContentHeader } from './page-objects/content-header';

test.describe('content header', () => {
  let contentHeader: ContentHeader;
  let windowSpy: jest.SpyInstance;
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    await page.goto('http://localhost:3001/reviewed-preprints/123');
    contentHeader = new ContentHeader(page);
    windowSpy = jest.spyOn(window, 'window', 'get');
    windowSpy.mockImplementation(() => ({}));
  });
  test.afterEach(() => {
    windowSpy.mockRestore();
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
    await contentHeader.assertAuthorsExists('Brain');
    await contentHeader.assertAuthorsExists('Pinky Mouse');
  });

  test('has correct institutions', async () => {
    await contentHeader.assertInstitutionExists('Acme LabsNew York'); // formatted this way due to css before adding space and comma
  });

  test('has correct doi', async () => {
    await contentHeader.assertDOI('10.7554/eLife.123.1');
  });

  test('displays correct number of authors', async ({ page }) => {
    await contentHeader.assertVisibleAuthorsCount(10);

    await page.setViewportSize({ width: 767, height: 1000 });
    await contentHeader.assertVisibleAuthorsCount(3);
  });

  test('displays show more for author list', async ({ page }) => {
    await contentHeader.assertVisibleAuthorsCount(10);
    await contentHeader.assertAuthorsShowMore(1);

    await page.setViewportSize({ width: 767, height: 1000 });
    await contentHeader.assertAuthorsShowMore(8, true);
  });

  test('displays all authors when show more is clicked', async () => {
    await contentHeader.assertVisibleAuthorsCount(10);
    await contentHeader.toggleAuthorsExpansion();
    await contentHeader.assertVisibleAuthorsCount(11);
  });

  test('displays fewer authors when show less is clicked', async () => {
    await contentHeader.toggleAuthorsExpansion();
    await contentHeader.assertVisibleAuthorsCount(11);

    await contentHeader.assertAuthorsShowLess();
    await contentHeader.toggleAuthorsExpansion();
    await contentHeader.assertVisibleAuthorsCount(10);
  });

  test('displays correct number of institutions', async ({ page }) => {
    await contentHeader.assertVisibleInstitutionsCount(3);

    await page.setViewportSize({ width: 767, height: 1000 });
    await contentHeader.assertVisibleInstitutionsCount(0);
  });

  test('displays show more for institution list', async ({ page }) => {
    await contentHeader.assertVisibleInstitutionsCount(3);
    await contentHeader.assertInstitutionsShowMore(1);

    await page.setViewportSize({ width: 767, height: 1000 });
    await contentHeader.assertInstitutionsHidden();
  });

  test('displays all institutions when show more is clicked', async () => {
    await contentHeader.assertVisibleInstitutionsCount(3);
    await contentHeader.toggleInstitutionsExpansion();
    await contentHeader.assertVisibleInstitutionsCount(4);
  });

  test('displays fewer institutions when show less is clicked', async () => {
    await contentHeader.toggleInstitutionsExpansion();
    await contentHeader.assertVisibleInstitutionsCount(4);

    await contentHeader.assertInstitutionsShowLess();
    await contentHeader.toggleInstitutionsExpansion();
    await contentHeader.assertVisibleInstitutionsCount(3);
  });
});
