import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { readJsonData } from '../utils/jsonReader';
import { generateUniqueEmail, generateUniqueName } from '../utils/testDataGenerator';
import { SignupData } from '../data/testData.types';

const signupData = readJsonData<SignupData>('signupData.json');

test.describe('New User Signup', () => {
  test('user should register a new user', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const name = generateUniqueName();
    const email = generateUniqueEmail();

    await homePage.open();
    await homePage.goToSignupLogin();
    await expect(page).toHaveURL(/\/login/);

    await loginPage.submitNewSignup(name, email);
    expect(await signupPage.isDisplayed()).toBeTruthy();

    expect(await signupPage.getPrefilledName()).toBe(name);
    expect(await signupPage.getPrefilledEmail()).toBe(email);

    await signupPage.fillAccountInformation(signupData.accountInfo);
    await signupPage.fillAddressInformation(signupData.addressInfo);
    await signupPage.submitCreateAccount();

    expect(await accountCreatedPage.isDisplayed()).toBeTruthy();
    await accountCreatedPage.clickContinue();

    expect(await homePage.isLoggedInAsVisible()).toBeTruthy();
    expect(await homePage.getLoggedInAsText()).toContain(name);
  });

});
