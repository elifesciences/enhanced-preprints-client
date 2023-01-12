import { expect, Locator, Page } from '@playwright/test';

export class ContentHeader {
  private page: Page;

  readonly msas: Locator;

  readonly title: Locator;

  readonly authors: Locator;

  readonly institutions: Locator;

  readonly doi: Locator;

  constructor(thePage: Page) {
    this.page = thePage;
    this.msas = this.page.locator('.article-flag-list');
    this.title = this.page.locator('.title');
    this.authors = this.page.locator('.authors');
    this.institutions = this.page.locator('.institutions');
    this.doi = this.page.locator('.descriptors__identifier a'); // may need to change when we have more identifiers
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
    const visibleAuthors = await this.authors.locator('li:visible').count();
    expect(visibleAuthors).toStrictEqual(count);
  }

  async assertInstitutionExists(institution: string): Promise<void> {
    const institutions = await this.institutions.locator('li').allInnerTexts();
    expect(institutions.map((item) => item.trim())).toContain(institution);
  }

  async assertDOI(doi: string): Promise<void> {
    await expect(this.doi).toContainText(`https://doi.org/${doi}`);
  }
}
