// COVERED Test Case 1 and 5 FROM AUTOMATIONEXERCISE.COM

import { test, expect } from '@playwright/test';
import { generateNextUser } from '../utils/userGenerator';
//1. Launch browser

test('Register New User', async ({ page }) => {
      test.setTimeout(180000);

      const user = generateNextUser();

//2. Navigate to url 'http://automationexercise.com'

await test.step('Navigate to home page', async () => {
await page.goto('/');

//3. Verify that home page is visible successfully
await expect(page.locator('body')).toBeVisible();
await page.locator('button', { hasText: 'Consent' }).click();
});

//4. Click on 'Signup / Login' button
await test.step('Click on Signup / Login button', async () => {
await page.click('text=Signup / Login');
await expect(page.locator('body')).toBeVisible();

//5. Verify 'New User Signup!' is visible
});

//6.1 Enter name and email address
await test.step('Enter name and email address', async () => {
      await expect(page.locator('text=New User Signup!')).toBeVisible();
      await expect(page.locator('[data-qa="signup-name"]')).toBeVisible();
      await expect(page.locator('[data-qa="signup-email"]')).toBeVisible();
      await page.getByRole('button', { name: 'Signup' }).click();

//6.1 Check name validation
            await expect(page.getByRole('textbox', { name: 'Name' })).toHaveJSProperty('validationMessage', 'Please fill out this field.');
            await page.locator('[data-qa="signup-name"]').fill(user.username);
//6.2 Check email validation
                  await page.getByRole('button', { name: 'Signup' }).click();
                  await expect(page.locator('[data-qa="signup-email"]')).toHaveJSProperty('validationMessage', 'Please fill out this field.');

//6.3 Enter existing user 
await test.step('Negative login: existing user', async () => {
      await page.fill('[data-qa="signup-name"]', 'Test');
      await page.fill('[data-qa="signup-email"]','georgitest1@example.com');
      await page.getByRole('button', { name: 'Signup' }).click();
      await expect(page.locator('text=Email Address already exist!')).toBeVisible();
});



await page.locator('[data-qa="signup-name"]').fill(user.username);
await page.locator('[data-qa="signup-email"]').fill(user.email);
});

//7. Click 'Signup' button
await test.step('Click Signup button', async () => {
await page.locator('[data-qa="signup-button"]').click();

//8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
await expect(page.locator('text=Enter Account Information')).toBeVisible();
});

//9. Fill details: Title, Name, Email, Password, Date of birth
await test.step('Fill details: Title, Name, Email, Password, Date of birth', async () => {
await expect(page.locator('#id_gender1')).toBeVisible();
await expect(page.locator('#id_gender2')).toBeVisible();
await expect(page.locator('#name')).toBeVisible();
await expect(page.locator('#email')).toBeVisible();
await expect(page.locator('#password')).toBeVisible();

await page.locator('#id_gender1').check();
await expect(page.locator('#name')).toHaveValue(user.username);
await expect(page.locator('#email')).toHaveValue(user.email);
await page.locator('#password').fill('Test1234');
await page.locator('#days').selectOption('10');
await page.locator('#months').selectOption('5');
await page.locator('#years').selectOption('1990');     
});

//9.0 Check adress infromation validation
await test.step('Check adress infromation validation', async () => {
await expect(page.locator('#first_name')).toBeVisible();
await expect(page.locator('#last_name')).toBeVisible();
await expect(page.locator('#company')).toBeVisible();
await expect(page.locator('#address1')).toBeVisible();
await expect(page.locator('#address2')).toBeVisible();
await expect(page.locator('#country')).toBeVisible();
await expect(page.locator('#state')).toBeVisible();
await expect(page.locator('#city')).toBeVisible();
await expect(page.locator('#zipcode')).toBeVisible();
await expect(page.locator('#mobile_number')).toBeVisible();
});

//9.1 Check adress validation
await test.step('Check adress validation', async () => {
await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#first_name')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#first_name').fill('Georgi');


await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#last_name')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#last_name').fill('Atanasov');

await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#address1')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#address1').fill('Some Address 123');
});

//await page.getByRole('button', { name: 'Create Account' }).click();
//await expect(page.locator('#country')).toHaveJSProperty('validationMessage', 'Please select an item in the list.');
await test.step('Select country', async () => {
await page.locator('#country').selectOption('Canada');

await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#state')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#state').fill('Some State');

await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#city')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#city').fill('Some City');

await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#zipcode')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#zipcode').fill('12345');

await page.getByRole('button', { name: 'Create Account' }).click();
await expect(page.locator('#mobile_number')).toHaveJSProperty('validationMessage', 'Please fill out this field.');
await page.locator('#mobile_number').fill('+1234567890');
});

//10. Select checkbox 'Sign up for our newsletter!'
await test.step('Select checkbox Sign up for our newsletter!', async () => {
await page.locator('#newsletter').check();

//11. Select checkbox 'Receive special offers from our partners!'
await page.locator('#optin').check();
});

//12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number

//////...already done above...\\\\\\

//13. Click 'Create Account button'
await test.step('Click Create Account button', async () => {
await page.getByRole('button', { name: 'Create Account' }).click();

//14. Verify that 'ACCOUNT CREATED!' is visible
await expect(page.locator('text=Account Created!')).toBeVisible();

//15. Click 'Continue' button
await page.locator('[data-qa="continue-button"]').click();

//16. Verify that 'Logged in as username' is visible
await expect(page.locator(`text=Logged in as ${user.username}`)).toBeVisible();
});


//17. Click 'Delete Account' button
await test.step('Click Delete Account button', async () => {
await page.getByRole('link', { name: 'Delete Account' }).click();

//18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
await expect(page.locator('text=Account Deleted!')).toBeVisible();
await page.locator('[data-qa=continue-button]').click();
});

});