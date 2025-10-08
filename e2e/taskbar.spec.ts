import { test, expect } from '@playwright/test';

test.describe('Taskbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display taskbar', async ({ page }) => {
    // Check if taskbar is visible
    await expect(page.getByText('Start')).toBeVisible();
  });

  test('should display time', async ({ page }) => {
    // Check if time is displayed (format: HH:MM AM/PM)
    const timeRegex = /\d{1,2}:\d{2} (AM|PM)/;
    await expect(page.locator('text=/\\d{1,2}:\\d{2} (AM|PM)/')).toBeVisible();
  });

  test('should show task button when window is opened', async ({ page }) => {
    // Initially no task buttons
    const taskButtons = page.locator('button:has(img[alt=""])');
    await expect(taskButtons).toHaveCount(0);

    // Open window
    await page.getByText('My Computer').dblclick();

    // Task button should appear
    await expect(page.locator('button:has-text("My Computer")')).toBeVisible();
  });

  test('should remove task button when window is closed', async ({ page }) => {
    // Open window
    await page.getByText('My Computer').dblclick();
    await expect(page.locator('button:has-text("My Computer")')).toBeVisible();

    // Close window
    await page.locator('.window-header:has-text("My Computer") button:has-text("X")').click();

    // Task button should be removed
    await expect(page.locator('button:has-text("My Computer")')).not.toBeVisible();
  });

  test('should show multiple task buttons for multiple windows', async ({ page }) => {
    // Open both windows
    await page.getByText('My Computer').dblclick();
    await page.getByText('Recycle Bin').dblclick();

    // Both task buttons should be visible
    await expect(page.locator('button:has-text("My Computer")')).toBeVisible();
    await expect(page.locator('button:has-text("Recycle Bin")')).toBeVisible();
  });

  test('should be positioned at the bottom of the screen', async ({ page }) => {
    // Get taskbar element
    const taskbar = page.locator('main > div').last();

    // Get taskbar position
    const taskbarBox = await taskbar.boundingBox();
    expect(taskbarBox).not.toBeNull();

    // Get viewport height
    const viewportSize = page.viewportSize();
    expect(viewportSize).not.toBeNull();

    // Taskbar should be at the bottom (within a reasonable margin)
    const taskbarBottom = taskbarBox!.y + taskbarBox!.height;
    const viewportHeight = viewportSize!.height;
    expect(taskbarBottom).toBeGreaterThanOrEqual(viewportHeight - 5);
  });

  test('should have fixed height', async ({ page }) => {
    // Get taskbar element
    const taskbar = page.locator('main > div').last();

    // Get taskbar height
    const taskbarBox = await taskbar.boundingBox();
    expect(taskbarBox).not.toBeNull();

    // Height should be 40px
    expect(taskbarBox!.height).toBe(40);
  });
});
