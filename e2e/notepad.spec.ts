import { test, expect } from '@playwright/test';

test.describe('Notepad', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Notepad icon', async ({ page }) => {
    await expect(page.getByText('Notepad').first()).toBeVisible();
  });

  test('should open Notepad window with menu bar', async ({ page }) => {
    // Double-click on Notepad icon
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    // Check if window opened
    await expect(page.locator('.window-header:has-text("Notepad")')).toBeVisible();

    // Check if menu items are present
    const windowContent = page.locator('.window-header:has-text("Notepad")').locator('..');
    await expect(windowContent.getByText('File')).toBeVisible();
    await expect(windowContent.getByText('Edit')).toBeVisible();
    await expect(windowContent.getByText('Format')).toBeVisible();
    await expect(windowContent.getByText('View')).toBeVisible();
    await expect(windowContent.getByText('Help')).toBeVisible();
  });

  test('should have a text editor area', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    // Check if textarea is present
    await expect(page.getByRole('textbox', { name: 'Type your text here...' })).toBeVisible();
  });

  test('should allow typing text', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    const textarea = page.getByRole('textbox', { name: 'Type your text here...' });

    // Type some text
    const testText = 'Hello World!\nThis is a test.';
    await textarea.fill(testText);

    // Check if text was entered
    await expect(textarea).toHaveValue(testText);
  });

  test('should support multiline text', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    const textarea = page.getByRole('textbox', { name: 'Type your text here...' });

    // Type multiline text
    const multilineText = 'Line 1\nLine 2\nLine 3';
    await textarea.fill(multilineText);

    // Check if multiline text is preserved
    await expect(textarea).toHaveValue(multilineText);
  });

  test('should open with default size 600x400', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    const windowElement = page.locator('.window-header:has-text("Notepad")').locator('..');
    const windowBox = await windowElement.boundingBox();

    expect(windowBox).not.toBeNull();
    expect(windowBox!.width).toBe(600);
    expect(windowBox!.height).toBe(400);
  });

  test('should be closeable', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();
    await expect(page.locator('.window-header:has-text("Notepad")')).toBeVisible();

    // Close window
    await page.locator('.window-header:has-text("Notepad") button:has-text("X")').click();

    // Window should be closed
    await expect(page.locator('.window-header:has-text("Notepad")')).not.toBeVisible();
  });

  test('should be draggable', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    const windowHeader = page.locator('.window-header:has-text("Notepad")');
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

  test('should retain text when dragged', async ({ page }) => {
    // Open Notepad
    await page.locator('div').filter({ hasText: /^Notepad$/ }).dblclick();

    const textarea = page.getByRole('textbox', { name: 'Type your text here...' });
    const testText = 'This text should remain after dragging';

    // Type text
    await textarea.fill(testText);

    // Drag window
    const windowHeader = page.locator('.window-header:has-text("Notepad")');
    await windowHeader.dragTo(page.locator('body'), {
      targetPosition: { x: 300, y: 200 }
    });

    // Text should still be there
    await expect(textarea).toHaveValue(testText);
  });
});
