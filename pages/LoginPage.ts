import { Page, Locator } from '@playwright/test';

export class LoginPage {

        private emailInput: Locator;
        private passwordInput: Locator;
        private loginButton: Locator;

            constructor(private page: Page) {

        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
    }



   async navigate () {
       await this.page.goto('/login');
   }

   async login (email: string, password: string) {
       await this.emailInput.fill(email);
       await this.passwordInput.fill(password);
       await this.loginButton.click();
   }

   async logout () {
       await this.page.locator('text=Logout').click();
   }
}