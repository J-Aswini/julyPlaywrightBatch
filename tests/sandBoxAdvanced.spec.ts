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
        let marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const [a, b, c] = marks
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
        const page1 = await context.newPage();
        await page1.goto(`https://playwright-mastery-academy-app.vercel.app${href}`);
        await expect(page1.getByText('Popup Opened Successfully')).toBeVisible();
    })

    test('isolated context', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(5000)

        const contextTwo = await browser.newContext();
        const pageTwo = await contextTwo.newPage();
        await pageTwo.goto('https://testcms.reco-claims.ca/Login')
        await pageTwo.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await pageTwo.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await pageTwo.getByRole('button', { name: 'Login' }).click()
        await pageTwo.waitForTimeout(5000)

        const cookie = await context.cookies();
        console.log("cookie =>" + JSON.stringify(cookie));
        const cookieTwo = await contextTwo.cookies();
        console.log("cookieTwo =>" + JSON.stringify(cookieTwo));

    })


    test('drag and drop', async ({ page }) => {
        await page.goto(advancedUrl);
        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'));
        await expect(page.getByText('Drop completed successfully.')).toBeVisible();
    });


    test('upload file', async ({ page }) => {
        await page.goto(advancedUrl);
        await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-data.csv');
        await expect(page.getByText('uploaded successfully.')).toBeVisible();
        //getByText supports for partial text match
    });



    test('upload mutiple file', async ({ page }) => {
        await page.goto(advancedUrl);
        await page.getByTestId('multi-file-upload-input').setInputFiles(['uploads/practice-data.csv', 'uploads/practice-report.pdf']);
        await expect(page.getByText('2 files uploaded: practice-data.csv, practice-report.pdf.')).toBeVisible();
        //getByText supports for partial text match
    });


    test(' download file', async ({ page }) => {
        await page.goto(advancedUrl);
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-pdf-btn').click()
        ]);
        const fileName = await download.suggestedFilename();
        console.log("fileName =>" + fileName);
        await download.saveAs(`downloads/${fileName}`);
    })


    //practice-iframe
    test('handling iframe', async ({ page }) => {
        await page.goto(advancedUrl);
        const frame = page.frameLocator('#practice-iframe');
        await frame.locator('#frame-input').fill('playwright');
        await frame.locator('[id="frame-save"]').click();
        await expect(frame.getByText('Result: playwright saved')).toBeVisible();

    });


    test('handling shadow dom', async ({ page }) => {
        await page.goto(advancedUrl);
        //shadow-host
        const frame = page.getByTestId('shadow-host');
        await frame.locator('#shadow-input').fill('playwright');
        await frame.locator('[id="shadow-save"]').click();
        await expect(frame.getByText('Result: playwright saved')).toBeVisible();
    });


    test('handling date components', async ({ page }) => {
        await page.goto(advancedUrl);
        await page.getByTestId('practice-date-picker').type('06-11-2015');
        const datePickerValue = await page.getByTestId('practice-date-picker').inputValue();
        console.log("datePickerValue =>" + datePickerValue);
        await expect(page.getByTestId('practice-date-picker')).toHaveValue('2015-11-06');
    });


    test('handling date component using js method', async ({ page }) => {
        await page.goto(advancedUrl);
        await page.getByTestId('practice-date-picker').evaluate((dom, value) => {
            const html = dom as HTMLInputElement;
            html.value = value as string;
            html.dispatchEvent(new Event('input'));
            html.dispatchEvent(new Event('change'));
        }, '2015-11-06')
        await expect(page.getByTestId('practice-date-picker')).toHaveValue('2015-11-06');
    });



    
}
)