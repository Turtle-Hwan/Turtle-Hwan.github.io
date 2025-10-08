import { test, expect } from '@playwright/test';

test.describe('Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display desktop icons', async ({ page }) => {
    // Check if desktop icons are visible
    await expect(page.getByText('My Computer')).toBeVisible();
    await expect(page.getByText('Recycle Bin')).toBeVisible();
    await expect(page.getByText('Internet Explorer')).toBeVisible();
    await expect(page.getByText('Notepad')).toBeVisible();
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

  test('should have icons at correct initial positions', async ({ page }) => {
    // Get My Computer icon
    const myComputerIcon = page.locator('div').filter({ hasText: /^My Computer$/ }).first();
    const myComputerBox = await myComputerIcon.boundingBox();
    expect(myComputerBox).not.toBeNull();

    // My Computer should be at (20, 20)
    expect(myComputerBox!.x).toBe(20);
    expect(myComputerBox!.y).toBe(20);

    // Get Recycle Bin icon
    const recycleBinIcon = page.locator('div').filter({ hasText: /^Recycle Bin$/ }).first();
    const recycleBinBox = await recycleBinIcon.boundingBox();
    expect(recycleBinBox).not.toBeNull();

    // Recycle Bin should be at (20, 120)
    expect(recycleBinBox!.x).toBe(20);
    expect(recycleBinBox!.y).toBe(120);

    // Get Internet Explorer icon
    const ieIcon = page.locator('div').filter({ hasText: /^Internet Explorer$/ }).first();
    const ieBox = await ieIcon.boundingBox();
    expect(ieBox).not.toBeNull();

    // Internet Explorer should be at (20, 220)
    expect(ieBox!.x).toBe(20);
    expect(ieBox!.y).toBe(220);

    // Get Notepad icon
    const notepadIcon = page.locator('div').filter({ hasText: /^Notepad$/ }).first();
    const notepadBox = await notepadIcon.boundingBox();
    expect(notepadBox).not.toBeNull();

    // Notepad should be at (20, 320)
    expect(notepadBox!.x).toBe(20);
    expect(notepadBox!.y).toBe(320);
  });

  test('should be able to drag icons', async ({ page }) => {
    // Get My Computer icon
    const myComputerIcon = page.locator('div').filter({ hasText: /^My Computer$/ }).first();

    // Get initial position
    const initialBox = await myComputerIcon.boundingBox();
    expect(initialBox).not.toBeNull();

    // Drag icon to a new position
    await myComputerIcon.dragTo(page.locator('main > div').first(), {
      targetPosition: { x: 200, y: 200 }
    });

    // Get new position
    const newBox = await myComputerIcon.boundingBox();
    expect(newBox).not.toBeNull();

    // Position should have changed
    expect(newBox!.x).not.toBe(initialBox!.x);
    expect(newBox!.y).not.toBe(initialBox!.y);
  });

  test('window should not go below taskbar', async ({ page }) => {
    // Open window
    await page.getByText('My Computer').dblclick();

    const windowHeader = page.locator('.window-header:has-text("My Computer")');
    const windowElement = windowHeader.locator('..');

    // Get viewport height
    const viewportSize = page.viewportSize();
    expect(viewportSize).not.toBeNull();

    // Try to drag window to the bottom
    await windowHeader.dragTo(page.locator('body'), {
      targetPosition: { x: 100, y: viewportSize!.height - 10 }
    });

    // Get window position
    const windowBox = await windowElement.boundingBox();
    expect(windowBox).not.toBeNull();

    // Window bottom should not exceed viewport height minus taskbar height (40px)
    const windowBottom = windowBox!.y + windowBox!.height;
    expect(windowBottom).toBeLessThanOrEqual(viewportSize!.height - 40);
  });

  test('desktop area should end above taskbar', async ({ page }) => {
    // Get desktop area
    const desktop = page.locator('main > div').first();

    // Get desktop position
    const desktopBox = await desktop.boundingBox();
    expect(desktopBox).not.toBeNull();

    // Get viewport height
    const viewportSize = page.viewportSize();
    expect(viewportSize).not.toBeNull();

    // Desktop bottom should be at viewport height minus taskbar height (40px)
    const desktopBottom = desktopBox!.y + desktopBox!.height;
    expect(desktopBottom).toBe(viewportSize!.height - 40);
  });
});
