import { test } from '@playwright/test';
test('test', async ({ page }) => {
    // Go to https://www.wikipedia.org/
    await page.goto('localhost:8080');
});