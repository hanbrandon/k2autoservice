import { test, expect } from '@playwright/test';

test.describe('Pre-Approve Form Automation', () => {
    test('should fill out and submit the personal pre-approval form', async ({
        page,
    }) => {
        // Go to the pre-approve page
        await page.goto('/pre-approve');

        // --- STEP 1 ---
        await page.fill('#firstName', 'TEST');
        await page.fill('#lastName', 'USER');
        await page.fill('#email', 'test@example.com');
        await page.fill('#phone', '1234567890');
        await page.fill('#zipCode', '90001');

        // Click Continue
        await page.getByRole('button', { name: /Continue/i }).click();

        // Wait for Step 2
        await expect(page.locator('h1')).toContainText('Credit Application');

        // --- STEP 2 (Personal) ---
        await page.fill('#dob', '01011990'); // Should auto-format to 01-01-1990
        await page.fill('#ssn', '123456789'); // Should auto-format to 123-45-6789
        await page.fill('#driversLicense', 'DL1234567');
        await page.selectOption('#dlState', 'CA');
        await page.selectOption('#employmentStatus', 'employed');

        // Residence History
        await page.fill('#res-address-0', '123 Main St');
        await page.fill('#res-city-0', 'Garden Grove');
        await page.fill('#res-state-0', 'CA');
        await page.fill('#res-zip-0', '92840');
        await page.fill('#res-years-0', '2');
        await page.fill('#res-months-0', '0');
        await page.selectOption('#res-type-0', 'rent');
        await page.fill('#res-amount-0', '2000');

        // Work History
        await page.fill('#work-employer-0', 'K2 Auto Service');
        await page.fill('#work-jobTitle-0', 'Mechanic');
        await page.fill('#work-monthlyIncome-0', '5000');
        await page.fill('#work-years-0', '3');
        await page.fill('#work-months-0', '0');
        await page.fill('#work-address-0', '123 Work Rd');
        await page.fill('#work-phone-0', '9876543210');

        // Signature
        await page.fill('#signature', 'TEST USER');

        // Submit
        await page.getByRole('button', { name: /Submit Application/i }).click();

        // Success Check
        await expect(page.locator('h2').filter({ hasText: 'Application Received' })).toBeVisible();
    });

    test('should fill out and submit the business pre-approval form', async ({
        page,
    }) => {
        await page.goto('/pre-approve');

        // Step 1
        await page.fill('#firstName', 'BIZ');
        await page.fill('#lastName', 'TEST');
        await page.fill('#email', 'biz@example.com');
        await page.fill('#phone', '0987654321');
        await page.fill('#zipCode', '90210');
        await page.getByRole('button', { name: /Continue/i }).click();

        // Switch to Business
        await page.click('button:has-text("Business")');

        // Business Info
        await page.fill('#legalName', 'Test Corp LLC');
        await page.fill('#taxId', '123456789'); // Should auto-format to 12-3456789
        await page.fill('#dba', 'Test DBA Name');
        await page.fill('#yearsInBusiness', '5');
        await page.fill('#biz-phone', '1231231234');
        await page.fill('#biz-email', 'info@testcorp.com');

        // Business Address
        await page.fill('#street', '456 Business Ave');
        await page.fill('#city', 'Irvine');
        await page.fill('#state', 'CA');
        await page.fill('#zip', '92606');

        // Income
        await page.fill('#grossProfit', '10000');
        await page.fill('#annualSales', '120000');

        // Signature
        await page.fill('#signature', 'BIZ TEST');

        // Submit
        await page.getByRole('button', { name: /Submit Application/i }).click();

        // Success Check
        await expect(page.locator('h2').filter({ hasText: 'Application Received' })).toBeVisible();
    });
});
