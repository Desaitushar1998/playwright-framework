import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
  private readonly accountCreatedHeading = this.page.locator('[data-qa="account-created"]');
  private readonly continueButton = this.page.locator('[data-qa="continue-button"]');
  private readonly logoutButton = this.page.locator("text=Logout");

  constructor(page: Page) {
    super(page);
  }

  async isDisplayed(): Promise<boolean> {
    return this.actions.isVisible(this.accountCreatedHeading);
  }

  async clickContinue(): Promise<void> {
    await this.actions.click(this.continueButton);
  }

  async clickLogout(): Promise<void> {
    await this.actions.click(this.logoutButton);
  }
}
