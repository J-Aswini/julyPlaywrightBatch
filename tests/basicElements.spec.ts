import { test, expect } from '@playwright/test'

test('Verify User Login with Valid Credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[placeholder="Username"]').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('.submit-button').click()

})


test('click login button', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('button', { name: 'Login' }).click()


})

test('Verify actions using getByRole method', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByRole('button', { name: 'Save' }).nth(1).click()
    await page.getByRole('button', { name: 'Save' }).first().click()
    //first() last() nth(2)
    //button,  a- link, h1 - heading,  select - combobox, dialog
    await page.getByRole('heading', { name: 'Playwright Locators Practice' }).click()
})


test('Verify actions using getByText method', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByText('Practice filter examples:').click()
})


test('Verify getByLabel method by filling input value', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByLabel('Email Address').fill('standarduser@gmail.com')
    await page.getByLabel('Password').fill('Test@1234')
})

test('Verify getByPlaceholder method by filling input value', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByPlaceholder('Enter your email').fill('standarduser@gmail.com')
    await page.getByPlaceholder('Enter password').fill('Test@1234')
})

test('Verify img using getByAltText method', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByAltText('Company Logo').click()
})

test('Verify img using getByTitle method', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByTitle('This is the company logo').click()
})

//data-testid="submit-form"
test('Verify actions using getByTestId method', async ({ page }) => {
    await page.goto('C:/julyPlaywrightBatch/locatorPractice.html')
    await page.getByTestId('submit-form').click()
})