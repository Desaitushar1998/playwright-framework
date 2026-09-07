import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { readJsonData } from '../utils/jsonReader';
import { createNewAccount } from '../utils/signupFlow';
import { SignupData, LoginTestData } from '../data/testData.types';

const signupData = readJsonData<SignupData>('signupData.json');
const loginData = readJsonData<LoginTestData>('loginData.json');

test.describe('Login', () => {
  test('should log in successfully with a valid, registered account', async ({ page }) => {

    const account = await createNewAccount(page, signupData);

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.goToSignupLogin();
    await loginPage.login(account.email, account.password);

    expect(await homePage.isLoggedInAsVisible()).toBeTruthy();
    expect(await homePage.getLoggedInAsText()).toContain(account.name);
    
    await loginPage.deleteAccount();
    });

  for (const invalidCredential of loginData.invalidCredentials) {
    test(`should reject login for unregistered email: ${invalidCredential.email}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);

      await homePage.open();
      await homePage.goToSignupLogin();
      await loginPage.login(invalidCredential.email, invalidCredential.password);

      const errorMessage = await loginPage.getLoginErrorMessage();
      expect(errorMessage).toContain('incorrect');
      expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
    });
  }

  test('should reject login with a valid email but wrong password', async ({ page }) => {
    const account = await createNewAccount(page, signupData);

    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.goToSignupLogin();
    await loginPage.login(account.email, 'IncorrectPassword@999');

    const errorMessage = await loginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('incorrect');
  });
});
