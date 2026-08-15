import { test, expect } from '@playwright/test';
test.describe('basic sandbox', () => {
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

}
)