import { expect, Locator, Page } from '@playwright/test';

export class ContentHeader {
  private page: Page;

  readonly msas: Locator;

  readonly title: Locator;

  readonly authors: Locator;

  readonly authorsExpansion: Locator;

  readonly institutions: Locator;

  readonly doi: Locator;

  constructor(thePage: Page) {
    this.page = thePage;
    this.msas = this.page.locator('.article-flag-list');
    this.title = this.page.locator('.title');
    this.authors = this.page.locator('.authors');
    this.authorsExpansion = this.page.locator('.authors-list__expansion');
    this.institutions = this.page.locator('.institutions');
    this.doi = this.page.locator('.descriptors__identifier a'); // may need to change when we have more identifiers
  }

  async toggleAuthorExpansion(): Promise<void> {
    await this.authorsExpansion.click();
  }

  async assertMSAExists(msa: string): Promise<void> {
    const msas = await this.msas.locator('li').allInnerTexts();
    expect(msas).toContain(msa);
  }

  async assertTitle(title: string): Promise<void> {
    await expect(this.title).toContainText(title);
  }

  async assertAuthorExists(author: string): Promise<void> {
    const authors = await this.authors.locator('li').allInnerTexts();
    expect(authors.map((item) => item.trim())).toContain(author);
  }

  async assertVisibleAuthorCount(count: number): Promise<void> {
    const authors = this.authors.locator('li:visible');

    await expect(authors).toHaveCount(count);
  }

  async assertAuthorShowMore(more: number, smallViewport: boolean = false): Promise<void> {
    await expect(this.authorsExpansion).toBeVisible();
    await expect(this.authorsExpansion).toContainText('show');
    await expect(this.authorsExpansion).toContainText('more');
    await expect(this.authorsExpansion.locator(`.authors-list__expansion-count-${smallViewport ? '3' : '10'}`)).toHaveText(more.toString());
  }

  async assertAuthorShowLess(): Promise<void> {
    await expect(this.authorsExpansion).toBeVisible();
    await expect(this.authorsExpansion).toHaveText('show less');
  }

  async assertInstitutionExists(institution: string): Promise<void> {
    const institutions = await this.institutions.locator('li').allInnerTexts();
    expect(institutions.map((item) => item.trim())).toContain(institution);
  }

  async assertDOI(doi: string): Promise<void> {
    await expect(this.doi).toContainText(`https://doi.org/${doi}`);
  }
}
