# Test info

- Name: ThreadVerse Critical Path >> Text input updates preview text
- Location: U:\Navnitya\Project\ThreadVerse\tests\critical-path.spec.js:35:7

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('thread-verse-app') to be visible
    63 × locator resolved to hidden <thread-verse-app></thread-verse-app>

    at U:\Navnitya\Project\ThreadVerse\tests\critical-path.spec.js:6:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('ThreadVerse Critical Path', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('http://127.0.0.1:8081/index.html');
>  6 |     await page.waitForSelector('thread-verse-app');
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   7 |     await page.waitForTimeout(1000);
   8 |   });
   9 |
  10 |   test('Landing page loads and shows repeating image transition', async ({ page }) => {
  11 |     await expect(page.locator('repeating-image-transition')).toBeVisible({ timeout: 10000 });
  12 |   });
  13 |
  14 |   test('Navigation to customizer page works', async ({ page }) => {
  15 |     await page.click('nav >> text=Customizer', { timeout: 10000 });
  16 |     await expect(page.locator('customizer-page')).toBeVisible({ timeout: 10000 });
  17 |   });
  18 |
  19 |   test('3D model loads on customizer page', async ({ page }) => {
  20 |     await page.click('nav >> text=Customizer', { timeout: 10000 });
  21 |     await expect(page.locator('threejs-tshirt')).toBeVisible({ timeout: 10000 });
  22 |   });
  23 |
  24 |   test('Image upload updates preview', async ({ page }) => {
  25 |     await page.click('nav >> text=Customizer', { timeout: 10000 });
  26 |     const filePath = 'tests/assets/test-image.png';
  27 |     const fileChooserPromise = page.waitForEvent('filechooser');
  28 |     await page.locator('image-uploader input[type="file"]').click();
  29 |     const fileChooser = await fileChooserPromise;
  30 |     await fileChooser.setFiles(filePath);
  31 |     // Check if preview image src updated (assuming image-uploader updates global state)
  32 |     await expect(page.locator('customizer-page img')).toHaveAttribute('src', /test-image.png/, { timeout: 10000 });
  33 |   });
  34 |
  35 |   test('Text input updates preview text', async ({ page }) => {
  36 |     await page.click('nav >> text=Customizer', { timeout: 10000 });
  37 |     const input = page.locator('text-input input');
  38 |     await input.fill('Test Print Text');
  39 |     await expect(page.locator('customizer-page div')).toContainText('Test Print Text', { timeout: 10000 });
  40 |   });
  41 | });
  42 |
```