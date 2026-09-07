import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // New User Signup! section
  private readonly newSignupNameInput = this.page.locator('input[data-qa="signup-name"]');
  private readonly newSignupEmailInput = this.page.locator('input[data-qa="signup-email"]');
  private readonly newSignupButton = this.page.locator('button[data-qa="signup-button"]');
  private readonly signupErrorMessage = this.page.locator('.signup-form p');

  // Login to your account section
  private readonly loginEmailInput = this.page.locator('input[data-qa="login-email"]');
  private readonly loginPasswordInput = this.page.locator('input[data-qa="login-password"]');
  private readonly loginButton = this.page.locator('button[data-qa="login-button"]');
  private readonly loginErrorMessage = this.page.locator('.login-form p');
  private readonly deleteButton = this.page.locator("text=Delete Account");



  constructor(page: Page) {
    super(page);
  }

  async submitNewSignup(name: string, email: string): Promise<void> {
    await this.actions.fill(this.newSignupNameInput, name);
    await this.actions.fill(this.newSignupEmailInput, email);
    await this.actions.click(this.newSignupButton);
  }

  async getSignupErrorMessage(): Promise<string> {
    return this.actions.getText(this.signupErrorMessage);
  }

  async login(email: string, password: string): Promise<void> {
    await this.actions.fill(this.loginEmailInput, email);
    await this.actions.fill(this.loginPasswordInput, password);
    await this.actions.click(this.loginButton);
  }

  async getLoginErrorMessage(): Promise<string> {
    return this.actions.getText(this.loginErrorMessage);
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return this.actions.isVisible(this.loginButton);
  }

  async deleteAccount(): Promise<void> {
    await this.actions.click(this.deleteButton);
  }
}
