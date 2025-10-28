import {test, expect} from '@playwright/test';
import {readLastUser} from '../utils/saveLastUser';

test ('Login with last generated user', async ({page}) => {
    const user = readLastUser();

    

    await page.goto('https://automationexercise.com/login');
    await page.fill('[data-qa="login-email"]', user.email);
    await page.fill('[data-qa="login-password"]', user.password);
        await page.click('data-qa="login-button"');

await expect(page.locator('text=Logged in as')).toBeVisible();
  console.log(`Successfully logged in as ${user.username}`);
    });