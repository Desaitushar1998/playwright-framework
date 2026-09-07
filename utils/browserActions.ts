import { Page, Locator, expect } from '@playwright/test';

export class BrowserActions {
  constructor(private readonly page: Page) {}

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async selectByValue(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  async check(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async waitForVisible(locator: Locator, timeoutMs?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: timeoutMs });
  }

  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async assertTextContains(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toContainText(expected);
  }

  async assertUrlContains(expected: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expected));
  }
}
