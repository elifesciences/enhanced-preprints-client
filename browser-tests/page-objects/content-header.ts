import { expect, Locator, Page } from '@playwright/test';

export class ContentHeader {
  private page: Page;

  readonly msas: Locator;

  readonly title: Locator;

  readonly authors: Locator;

  readonly institutions: Locator;

  readonly doi: Locator;
  //
  // readonly license: Locator;
  //
  // readonly openAccess: Locator;

  constructor(thePage: Page) {
    this.page = thePage;
    this.msas = this.page.locator('body>div>div>div>header>ul');
    this.title = this.page.locator('header h1');
    this.authors = this.page.locator('header ol').nth(0);
    this.institutions = this.page.locator('header ol').nth(1);
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

  async assertInstitutionExists(institution: string): Promise<void> {
    const institutions = await this.institutions.locator('li').allInnerTexts();
    expect(institutions.map((item) => item.trim())).toContain(institution);
  }

  // async assertInstitution(institution: string, affiliationNumber: number): Promise<void> {
  //   const affiliation = await this.affiliations.locator('li').nth(affiliationNumber);
  //   const affiliationText = await affiliation.locator('div').nth(1).textContent();
  //   expect(affiliationText.split(',')[0]).toBe(institution);
  // }
  //
  // async setCity(city: string, affiliationNumber: number): Promise<void> {
  //   await this.editButton.nth(affiliationNumber).click();
  //   await this.modal.city.fill(city);
  //   await this.closeModal();
  // }
  //
  // async assertCity(city: string, affiliationNumber: number): Promise<void> {
  //   const affiliation = await this.affiliations.locator('li').nth(affiliationNumber);
  //   await expect(affiliation.locator('div').nth(1)).toContainText(`, ${city}`);
  // }
  //
  // async setCountry(country: string, affiliationNumber: number): Promise<void> {
  //   await this.editButton.nth(affiliationNumber).click();
  //   await this.modal.country.fill(country);
  //   await this.closeModal();
  // }
  //
  // async assertCountry(country: string, affiliationNumber: number): Promise<void> {
  //   const affiliation = await this.affiliations.locator('li').nth(affiliationNumber);
  //   await expect(affiliation.locator('div').nth(1)).toContainText(`, ${country}`);
  // }
  //
  // async assertAffiliation({ institution, city, country }: Affiliation, affiliationNumber: number): Promise<void> {
  //   const affiliation = await this.affiliations.locator('li').nth(affiliationNumber);
  //   const affiliationElement = await affiliation.locator('div').nth(1);
  //   await expect(affiliationElement).toHaveText(`${institution}, ${city}, ${country}`);
  // }
  //
  // async addAuthor(affiliationNumber: number, authorName: string): Promise<void> {
  //   await this.editButton.nth(affiliationNumber).click();
  //   await this.modal.addAuthor.click();
  //   await this.modal.affiliatedAuthor.last().click();
  //   await this.page.locator('.MuiPopover-root li').locator(`text=${authorName}`).click();
  //   await this.closeModal();
  // }
  //
  // async assertAuthorHasAffiliations(authorNumber: number, affiliationNumbers: number[]): Promise<void> {
  //   const authorAffiliations = this.authorAffiliations.nth(authorNumber);
  //   await expect(authorAffiliations).toHaveText(affiliationNumbers.join(','));
  // }
  //
  // async deleteAuthor(affiliationNumber: number, authorNumber: number): Promise<void> {
  //   await this.editButton.nth(affiliationNumber).click();
  //   const authorName = await this.modal.affiliatedAuthor.nth(authorNumber).textContent();
  //   await this.modal.deleteAuthor.nth(authorNumber).click();
  //   await expect(this.modal.affiliatedAuthor.nth(authorNumber)).not.toHaveText(authorName);
  // }
  //
  // async deleteAffiliation(affiliationNumber: number): Promise<void> {
  //   await this.editButton.nth(affiliationNumber).click();
  //   const affiliationCount = await this.affiliations.locator('li').count();
  //   await this.modal.delete.click();
  //   await this.page.click('text=Delete >> nth=1');
  //   const newAffiliationCount = await this.affiliations.locator('li').count();
  //   expect(affiliationCount).toBeGreaterThan(newAffiliationCount);
  // }
  //
  // async affiliationCount(): Promise<number> {
  //   return this.affiliations.locator('li').count();
  // }
}
