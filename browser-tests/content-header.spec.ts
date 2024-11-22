import { test } from '@playwright/test';
import { ContentHeader } from './page-objects/content-header';

test.describe('content header', () => {
  let contentHeader: ContentHeader;
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 1000 });
    await page.goto('http://localhost:8080/reviewed-preprints/85111');
    contentHeader = new ContentHeader(page);
  });

  test('has title and links to intro page', async () => {
    await contentHeader.assertTitle('The locus coeruleus broadcasts prediction errors across the cortex to promote sensorimotor plasticity');
  });

  test('has correct msas', async () => {
    await contentHeader.assertMSAExists('Neuroscience');
  });

  test('has correct authors', async () => {
    await contentHeader.assertAuthorsExists('Rebecca Jordan author has email address', 'Georg B. Keller');
  });

  test('has correct institutions', async () => {
    await contentHeader.assertInstitutionExists('Friedrich Miescher Institute for Biomedical Research, Basel, Switzerland', 'Faculty of Sciences, University of Basel, Basel, Switzerland');
  });

  test('has correct doi', async () => {
    await contentHeader.assertDOI('10.7554/eLife.85111.2');
  });

  test('displays correct number of authors', async () => {
    await contentHeader.assertVisibleAuthorsCount(2);
  });

  test('displays correct number of institutions', async () => {
    await contentHeader.assertVisibleInstitutionsCount(2);
  });
});
