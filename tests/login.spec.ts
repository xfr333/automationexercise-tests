import {test, expect} from '@playwright/test';
import {readLastUser} from '../utils/saveLastUser';
import config from '../config.json' assert { type: 'json' };

// MAIN TEST STARTS HERE
test ('Login with last generated user', async ({page}) => {
    const user = readLastUser();
//Login page is loaded
await test.step('Navigate to home page', async () => {
  await page.goto(`${config.site_url}/login`);
  const consentButton = page.locator('button', { hasText: 'Consent' });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
await expect(page.locator('text=Login to your account')).toBeVisible();
});  
 
//TO DO: add check for other elements on the page

// Enter email address and password
await test.step('Enter email address and password', async () => {  
  await page.fill('[data-qa="login-email"]', user.email);
  await page.fill('[data-qa="login-password"]', user.password);
  // Define locators for validation
  const emailField = page.locator('[data-qa="login-email"]');
  const passwordField = page.locator('[data-qa="login-password"]');
  const emailValidation = await emailField.evaluate((el: HTMLInputElement) => el.validationMessage);
  const passwordValidation = await passwordField.evaluate((el: HTMLInputElement) => el.validationMessage);

if (emailValidation || passwordValidation) {
    console.log(`Validation messages - Email: ${emailValidation}, Password: ${passwordValidation}`);
  const persistentUser = config.persistent_test_user;
    await page.fill('[data-qa="login-email"]', persistentUser.email);
    await page.fill('[data-qa="login-password"]', persistentUser.password);
} else {
    console.log('No validation messages, proceeding with login.');
}
});

await test.step('Login with persistent user', async () => {
  const persistentUser = config.persistent_test_user;
  await page.fill('[data-qa="login-email"]', persistentUser.email);
  await page.fill('[data-qa="login-password"]', persistentUser.password);
  await page.click('[data-qa="login-button"]');
  await expect(page.locator('text=Logged in as Test')).toBeVisible();
  console.log(`Successfully logged in as Test`);
});


// Verify that 'Logged in as username' is visible
await test.step('Verify that Logged in', async () => {

await expect(page.locator('text=Logged in as Test')).toBeVisible();
  console.log(`Successfully logged in as Test}`);
    });
});