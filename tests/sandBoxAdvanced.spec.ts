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

}
)