import { test, expect } from '@playwright/test';

test.describe('Internet Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Internet Explorer icon', async ({ page }) => {
    await expect(page.getByText('Internet Explorer')).toBeVisible();
  });

  test('should open Internet Explorer window with address bar', async ({ page }) => {
    // Double-click on Internet Explorer icon
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();

    // Check if window opened
    await expect(page.locator('.window-header:has-text("Internet Explorer")')).toBeVisible();

    // Check if address bar is present
    await expect(page.getByRole('textbox', { name: 'Enter URL' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go' })).toBeVisible();
  });

  test('should navigate to URL when typing in address bar', async ({ page }) => {
    // Open Internet Explorer
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();

    const addressBar = page.getByRole('textbox', { name: 'Enter URL' });

    // Clear and type new URL
    await addressBar.fill('example.com');
    await addressBar.press('Enter');

    // Check if URL was updated (protocol should be added)
    await expect(addressBar).toHaveValue('https://example.com');
  });

  test('should navigate when clicking Go button', async ({ page }) => {
    // Open Internet Explorer
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();

    const addressBar = page.getByRole('textbox', { name: 'Enter URL' });
    const goButton = page.getByRole('button', { name: 'Go' });

    // Type URL and click Go
    await addressBar.fill('example.com');
    await goButton.click();

    // Check if URL was updated
    await expect(addressBar).toHaveValue('https://example.com');
  });

  test('should add https:// protocol if missing', async ({ page }) => {
    // Open Internet Explorer
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();

    const addressBar = page.getByRole('textbox', { name: 'Enter URL' });

    // Type URL without protocol
    await addressBar.fill('example.com');
    await addressBar.press('Enter');

    // Check if https:// was added
    await expect(addressBar).toHaveValue('https://example.com');
  });

  test('should contain iframe for content display', async ({ page }) => {
    // Open Internet Explorer
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();

    // Wait for the window to be visible
    await expect(page.locator('.window-header:has-text("Internet Explorer")')).toBeVisible();

    // Check if iframe exists
    const windowContent = page.locator('.window-header:has-text("Internet Explorer")').locator('..');
    const iframe = windowContent.locator('iframe');
    await expect(iframe).toBeVisible();
  });

  test('should open with default size 800x600', async ({ page }) => {
    // Open Internet Explorer
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();

    const windowElement = page.locator('.window-header:has-text("Internet Explorer")').locator('..');
    const windowBox = await windowElement.boundingBox();

    expect(windowBox).not.toBeNull();
    expect(windowBox!.width).toBe(800);
    expect(windowBox!.height).toBe(600);
  });

  test('should be closeable', async ({ page }) => {
    // Open Internet Explorer
    await page.locator('div').filter({ hasText: /^Internet Explorer$/ }).dblclick();
    await expect(page.locator('.window-header:has-text("Internet Explorer")')).toBeVisible();

    // Close window
    await page.locator('.window-header:has-text("Internet Explorer") button:has-text("X")').click();

    // Window should be closed
    await expect(page.locator('.window-header:has-text("Internet Explorer")')).not.toBeVisible();
  });
});
