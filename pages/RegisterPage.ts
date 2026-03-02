import { Page, Locator } from '@playwright/test';

export class RegisterPage {

    private signupName : Locator;
    private signupEmail : Locator;
    private signupButton : Locator;
    private password: Locator;
    private continueButton: Locator;

    constructor(private page: Page) {
        
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.password = page.locator('#password');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }
    
    async navigate () {
        await this.page.goto('/');   
    }

async fillSignupForm(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
}

async fillPassword(password: string) {
    await this.password.fill(password);
}

async createAccount() {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
}
async deleteAccount() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
}

async clickContinue() {
    await this.continueButton.click();
}
}