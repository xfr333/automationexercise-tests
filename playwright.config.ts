import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    use: {
        headless: false,
        launchOptions: {
            slowMo: 1500,
        },    
        
        baseURL: 'https://automationexercise.com',

    },
});