import { test, expect } from '@playwright/test';

test('Get All Products List-positive',async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('products');
    expect(Array.isArray(data.products)).toBeTruthy();
});


// Negative test case: Attempting to use an unsupported HTTP method (POST) on the productsList endpoint
// test('Get All Products List-negative',async ({ request }) => {
//     const response = await request.post('https://automationexercise.com/api/productsList');
//     expect(response.status()).toBe(405);
//     const data = await response.json();
//     console.log(data);
// });


test('POST To Verify Login with valid details', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'georgitest1@example.com',
            password: 'Test1234'
        }
    });
    expect(response.status()).toBe(200);
        const data = await response.json();
    expect(data).toHaveProperty('message', 'User exists!');
});

test('POST To Verify Login with unexisting user details', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        form: {
            email: 'georgitest@example.com',
            password: 'Test12#$'
        }
    });
    expect(response.status()).toBe(200);
        const data = await response.json();
    expect(data).toHaveProperty('message', 'User not found!');
});