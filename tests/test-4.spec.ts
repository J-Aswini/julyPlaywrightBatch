import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/');
})
test('test 1', async ({ page }) => {
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
});

test('test 2', async ({ page }) => {
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="login-button"]').click();
});
