import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly signupLoginTab = this.page.locator('a[href="/login"]');
  private readonly loggedInAsText = this.page.locator('a:has-text("Logged in as")');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.actions.goto('/');
  }

  async goToSignupLogin(): Promise<void> {
    await this.actions.click(this.signupLoginTab);
  }

  async isLoggedInAsVisible(): Promise<boolean> {
    return this.actions.isVisible(this.loggedInAsText);
  }

  async getLoggedInAsText(): Promise<string> {
    return this.actions.getText(this.loggedInAsText);
  }
}
