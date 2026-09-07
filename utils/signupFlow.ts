import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { generateUniqueEmail, generateUniqueName } from './testDataGenerator';
import { SignupData } from '../data/testData.types';

export interface CreatedAccount {
  name: string;
  email: string;
  password: string;
}

export async function createNewAccount(page: Page, signupData: SignupData): Promise<CreatedAccount> {
  const name = generateUniqueName();
  const email = generateUniqueEmail();

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const accountCreatedPage = new AccountCreatedPage(page);

  await homePage.open();
  await homePage.goToSignupLogin();
  await loginPage.submitNewSignup(name, email);

  await signupPage.fillAccountInformation(signupData.accountInfo);
  await signupPage.fillAddressInformation(signupData.addressInfo);
  await signupPage.submitCreateAccount();

  await accountCreatedPage.clickContinue();

  await accountCreatedPage.clickLogout();

  return { name, email, password: signupData.accountInfo.password };
}
