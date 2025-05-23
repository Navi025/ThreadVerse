import { test, expect } from '@playwright/test';

test.describe('ThreadVerse Critical Path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:8081/index.html');
    await page.waitForSelector('thread-verse-app');
    await page.waitForTimeout(1000);
  });

  test('Landing page loads and shows repeating image transition', async ({ page }) => {
    await expect(page.locator('repeating-image-transition')).toBeVisible({ timeout: 10000 });
  });

  test('Navigation to customizer page works', async ({ page }) => {
    await page.click('nav >> text=Customizer', { timeout: 10000 });
    await expect(page.locator('customizer-page')).toBeVisible({ timeout: 10000 });
  });

  test('3D model loads on customizer page', async ({ page }) => {
    await page.click('nav >> text=Customizer', { timeout: 10000 });
    await expect(page.locator('threejs-tshirt')).toBeVisible({ timeout: 10000 });
  });

  test('Image upload updates preview', async ({ page }) => {
    await page.click('nav >> text=Customizer', { timeout: 10000 });
    const filePath = 'tests/assets/test-image.png';
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('image-uploader input[type="file"]').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    // Check if preview image src updated (assuming image-uploader updates global state)
    await expect(page.locator('customizer-page img')).toHaveAttribute('src', /test-image.png/, { timeout: 10000 });
  });

  test('Text input updates preview text', async ({ page }) => {
    await page.click('nav >> text=Customizer', { timeout: 10000 });
    const input = page.locator('text-input input');
    await input.fill('Test Print Text');
    await expect(page.locator('customizer-page div')).toContainText('Test Print Text', { timeout: 10000 });
  });
});
