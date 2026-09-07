import { Page } from '@playwright/test';
import { BrowserActions } from '../utils/BrowserActions';

// Common base for every page object generic action.

export class BasePage {
  protected readonly page: Page;
  protected readonly actions: BrowserActions;

  constructor(page: Page) {
    this.page = page;
    this.actions = new BrowserActions(page);
  }
}
