import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SignupAccountInfo, SignupAddressInfo } from '../data/testData.types';

export class SignupPage extends BasePage {
  // Account Information
  private readonly titleMrRadio = this.page.locator('#id_gender1');
  private readonly titleMrsRadio = this.page.locator('#id_gender2');
  private readonly nameInput = this.page.locator('#name');
  private readonly emailInput = this.page.locator('#email');
  private readonly passwordInput = this.page.locator('#password');
  private readonly dobDaySelect = this.page.locator('#days');
  private readonly dobMonthSelect = this.page.locator('#months');
  private readonly dobYearSelect = this.page.locator('#years');
  private readonly newsletterCheckbox = this.page.locator('#newsletter');
  private readonly offersCheckbox = this.page.locator('#optin');

  // Address Information
  private readonly firstNameInput = this.page.locator('#first_name');
  private readonly lastNameInput = this.page.locator('#last_name');
  private readonly companyInput = this.page.locator('#company');
  private readonly address1Input = this.page.locator('#address1');
  private readonly address2Input = this.page.locator('#address2');
  private readonly countrySelect = this.page.locator('#country');
  private readonly stateInput = this.page.locator('#state');
  private readonly cityInput = this.page.locator('#city');
  private readonly zipcodeInput = this.page.locator('#zipcode');
  private readonly mobileNumberInput = this.page.locator('#mobile_number');

  private readonly createAccountButton = this.page.locator('button[data-qa="create-account"]');
  private readonly accountInfoHeading = this.page.locator("text=Enter Account Information");

  constructor(page: Page) {
    super(page);
  }

  async isDisplayed(): Promise<boolean> {
    return this.actions.isVisible(this.accountInfoHeading);
  }

  async fillAccountInformation(accountInfo: SignupAccountInfo): Promise<void> {
    const titleLocator = accountInfo.title === 'Mr' ? this.titleMrRadio : this.titleMrsRadio;
    await this.actions.click(titleLocator);

    await this.actions.fill(this.passwordInput, accountInfo.password);
    await this.actions.selectByValue(this.dobDaySelect, accountInfo.dobDay);
    await this.actions.selectByValue(this.dobMonthSelect, accountInfo.dobMonth);
    await this.actions.selectByValue(this.dobYearSelect, accountInfo.dobYear);

    if (accountInfo.subscribeNewsletter) {
      await this.actions.check(this.newsletterCheckbox);
    }
    if (accountInfo.receiveOffers) {
      await this.actions.check(this.offersCheckbox);
    }
  }

  async fillAddressInformation(addressInfo: SignupAddressInfo): Promise<void> {
    await this.actions.fill(this.firstNameInput, addressInfo.firstName);
    await this.actions.fill(this.lastNameInput, addressInfo.lastName);
    await this.actions.fill(this.companyInput, addressInfo.company);
    await this.actions.fill(this.address1Input, addressInfo.address1);
    await this.actions.fill(this.address2Input, addressInfo.address2);
    await this.actions.selectByValue(this.countrySelect, addressInfo.country);
    await this.actions.fill(this.stateInput, addressInfo.state);
    await this.actions.fill(this.cityInput, addressInfo.city);
    await this.actions.fill(this.zipcodeInput, addressInfo.zipcode);
    await this.actions.fill(this.mobileNumberInput, addressInfo.mobileNumber);
  }

  async getPrefilledName(): Promise<string> {
    return this.nameInput.inputValue();
  }

  async getPrefilledEmail(): Promise<string> {
    return this.emailInput.inputValue();
  }

  async submitCreateAccount(): Promise<void> {
    await this.actions.click(this.createAccountButton);
  }
  
}
