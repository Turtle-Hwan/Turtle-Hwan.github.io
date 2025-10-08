import { test, expect } from '@playwright/test';

test.describe('Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display desktop icons', async ({ page }) => {
    // Check if desktop icons are visible
    await expect(page.getByText('My Computer')).toBeVisible();
    await expect(page.getByText('Recycle Bin')).toBeVisible();
  });

  test('should open window when double-clicking an icon', async ({ page }) => {
    // Double-click on "My Computer" icon
    await page.getByText('My Computer').dblclick();

    // Check if window opened
    await expect(page.locator('.window-header:has-text("My Computer")')).toBeVisible();
    await expect(page.getByText('Contents of My Computer')).toBeVisible();
  });

  test('should close window when clicking X button', async ({ page }) => {
    // Open window
    await page.getByText('My Computer').dblclick();
    await expect(page.locator('.window-header:has-text("My Computer")')).toBeVisible();

    // Click close button
    await page.locator('.window-header:has-text("My Computer") button:has-text("X")').click();

    // Window should be closed
    await expect(page.locator('.window-header:has-text("My Computer")')).not.toBeVisible();
  });

  test('should display multiple windows', async ({ page }) => {
    // Open both windows
    await page.getByText('My Computer').dblclick();
    await page.getByText('Recycle Bin').dblclick();

    // Both windows should be visible
    await expect(page.locator('.window-header:has-text("My Computer")')).toBeVisible();
    await expect(page.locator('.window-header:has-text("Recycle Bin")')).toBeVisible();
  });

  test('should move window when dragging', async ({ page }) => {
    // Open window
    await page.getByText('My Computer').dblclick();

    const windowHeader = page.locator('.window-header:has-text("My Computer")');
    const windowElement = windowHeader.locator('..');

    // Get initial position
    const initialBox = await windowElement.boundingBox();
    expect(initialBox).not.toBeNull();

    // Drag window
    await windowHeader.dragTo(page.locator('body'), {
      targetPosition: { x: 400, y: 300 }
    });

    // Get new position
    const newBox = await windowElement.boundingBox();
    expect(newBox).not.toBeNull();

    // Position should have changed
    expect(newBox!.x).not.toBe(initialBox!.x);
    expect(newBox!.y).not.toBe(initialBox!.y);
  });
});
