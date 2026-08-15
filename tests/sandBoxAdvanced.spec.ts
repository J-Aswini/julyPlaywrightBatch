import { test, expect, chromium } from '@playwright/test';
test.describe('Advanced sandbox', () => {
    const advancedUrl = 'https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced';

    test('dynamic dropdown and bootstrap dropdown', async ({ page }) => {
        //dynamic dropdown with select and option tags
        await page.goto(advancedUrl);
        await page.getByTestId('dynamic-group-select').selectOption('Locators');
        await page.getByTestId('dynamic-option-select').selectOption('getByRole + name');
        await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible();
        //bootstap dropdown with select and option tags
        await page.getByTestId('bootstrap-dropdown-trigger').click();
        await page.getByText('Weekday Batch').click();
        await expect(page.getByText('Selected: Weekday Batch').first()).toBeVisible();
    })


    test('handle alert dialog', async ({ page }) => {
        await page.goto(advancedUrl);
        await page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        })
        await page.getByTestId('alert-btn').click();
        await expect(page.getByText('Alert handled.')).toBeVisible();


        await page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.dismiss();
        })
        await page.getByTestId('confirm-btn').click();
        await expect(page.getByText('Confirm dismissed.')).toBeVisible();

        await page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept('playwright');
        })
        await page.getByTestId('prompt-btn').click();
        await expect(page.getByText('Prompt value: playwright')).toBeVisible();

    });


test('Handle new tab', async () => {
const browser = await chromium.launch();
//browser -> context -> page
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(advancedUrl);
let marks= [1,2,3,4,5,6,7,8,9,10];
const [a,b,c] = marks
const [newPage] = await Promise.all([context.waitForEvent('page'), page.getByTestId('popup-link').click()]);
await expect(newPage).toHaveURL('https://playwright-mastery-academy-app.vercel.app/practice/popup');
await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible();
})


test('Handle new tab using href attr value', async () => {
const browser = await chromium.launch();
//browser -> context -> page
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(advancedUrl);
const href = await page.getByTestId('popup-right-click-link').getAttribute('href');
const page1= await context.newPage();
await page1.goto(`https://playwright-mastery-academy-app.vercel.app${href}`);
 await expect(page1.getByText('Popup Opened Successfully')).toBeVisible();
})
}
)