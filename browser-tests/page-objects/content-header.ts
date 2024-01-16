import { expect, Locator, Page } from '@playwright/test';

export class ContentHeader {
  private page: Page;

  readonly msas: Locator;

  readonly title: Locator;

  readonly authors: Locator;

  readonly visibleAuthors: Locator;

  readonly authorsExpansion: Locator;

  readonly institutions: Locator;

  readonly visibleInstitutions: Locator;

  readonly institutionsExpansion: Locator;

  readonly doi: Locator;

  constructor(thePage: Page) {
    this.page = thePage;
    this.msas = this.page.locator('.article-flag-list');
    this.title = this.page.locator('.title');
    this.authors = this.page.locator('.authors');
    this.visibleAuthors = this.page.locator('.authors li:visible');
    this.authorsExpansion = this.page.locator('.authors-list__expansion');
    this.institutions = this.page.locator('.institutions');
    this.visibleInstitutions = this.page.locator('.institutions li:visible');
    this.institutionsExpansion = this.page.locator('.institutions-list__expansion');
    this.doi = this.page.locator('header .descriptors__identifier a'); // may need to change when we have more identifiers
  }

  async toggleAuthorsExpansion(): Promise<void> {
    await this.authorsExpansion.click();
  }

  async toggleInstitutionsExpansion(): Promise<void> {
    await this.institutionsExpansion.click();
  }

  async assertMSAExists(msa: string): Promise<void> {
    const msas = await this.msas.locator('li').allInnerTexts();
    expect(msas).toContain(msa);
  }

  async assertTitle(title: string): Promise<void> {
    await expect(this.title).toContainText(title);
  }

  async assertAuthorsExists(author: string): Promise<void> {
    const authors = await this.authors.locator('li').allInnerTexts();
    expect(authors.map((item) => item.trim())).toContain(author);
  }

  async assertVisibleAuthorsCount(count: number): Promise<void> {
    await expect(this.visibleAuthors).toHaveCount(count);
  }

  async assertAuthorsShowMore(more: number, smallViewport: boolean = false): Promise<void> {
    await expect(this.authorsExpansion).toBeVisible();
    await expect(this.authorsExpansion).toContainText('show');
    await expect(this.authorsExpansion).toContainText('more');
    await expect(this.authorsExpansion.locator(`.authors-list__expansion-count-${smallViewport ? '3' : '10'}`)).toHaveText(more.toString());
  }

  async assertAuthorsShowLess(): Promise<void> {
    await expect(this.authorsExpansion).toBeVisible();
    await expect(this.authorsExpansion).toHaveText('show less');
  }

  async assertInstitutionExists(institution: string): Promise<void> {
    const institutions = await this.institutions.locator('li').allInnerTexts();
    expect(institutions.map((item) => item.trim())).toContain(institution);
  }

  async assertVisibleInstitutionsCount(count: number): Promise<void> {
    const institutions = this.institutions.locator('li:visible');

    await expect(institutions).toHaveCount(count);
  }

  async assertInstitutionsHidden(): Promise<void> {
    const institutions = this.institutions.locator('li:visible');
    await expect(institutions).toHaveCount(0);

    const expansion = this.institutions.locator('.institutions-list__expansion');
    await expect(expansion).toBeHidden();
  }

  async assertInstitutionsShowMore(more: number): Promise<void> {
    const expansion = this.institutions.locator('.institutions-list__expansion');
    await expect(expansion).toBeVisible();
    await expect(expansion).toHaveText(`show ${more} more`);
  }

  async assertInstitutionsShowLess(): Promise<void> {
    await expect(this.institutionsExpansion).toBeVisible();
    await expect(this.institutionsExpansion).toHaveText('show less');
  }

  async assertDOI(doi: string): Promise<void> {
    await expect(this.doi).toHaveText(`https://doi.org/${doi}`);
  }
}
