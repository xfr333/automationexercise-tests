import {test, expect} from '@playwright/test';
import {readLastUser} from '../utils/saveLastUser';

test ('Login with last generated user', async ({page}) => {
    //const user = readLastUser();

await test.step('Navigate to home page', async () => {
  await page.goto('/login');
  await page.locator('button', { hasText: 'Consent' }).click();
  await expect(page.locator('text=Login to your account')).toBeVisible();
});
//TO DO: add check for other elements on the page

// Enter email address and password
await test.step('Enter email address and password', async () => {

  await page.fill('[data-qa="login-email"]', 'georgitest1@example.com');
  await page.fill('[data-qa="login-password"]', 'Test1234');
});

// Click 'Login' button
await test.step('Click Login button', async () => {
  await page.click('[data-qa="login-button"]');
});

// Verify that 'Logged in as username' is visible
await test.step('Verify that Logged in', async () => {

await expect(page.locator('text=Logged in as Test`')).toBeVisible();
  console.log(`Successfully logged in as Test}`);
    });
});