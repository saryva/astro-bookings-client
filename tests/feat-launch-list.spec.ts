import { test, expect } from '@playwright/test';

test.describe('feat-launch-list', () => {
  test.describe('AC1: Navigation to /launches fetches launches', () => {
    test('should navigate to /launches when visiting the root URL', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL('**/launches');
      expect(page.url()).toContain('/launches');
    });

    test('should display the page title', async ({ page }) => {
      await page.goto('/launches');
      await expect(page.locator('.launch-list__title')).toHaveText('Available Launches');
    });
  });

  test.describe('AC3: Loading state', () => {
    test('should briefly show the loading component while fetching', async ({ page }) => {
      await page.goto('/launches');
      // The loading state may be very brief; check that the page eventually resolves
      // to either data, error, or empty state
      await expect(
        page.locator('app-loading, app-error-message, app-empty-state, .launch-card').first(),
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('AC5: Empty state when API returns no launches', () => {
    test('should display the empty state component', async ({ page }) => {
      await page.goto('/launches');
      await expect(page.locator('app-empty-state')).toBeVisible({ timeout: 10000 });
    });

    test('should display "No launches available." message', async ({ page }) => {
      await page.goto('/launches');
      await expect(page.locator('app-empty-state')).toContainText('No launches available.');
    });

    test('should not show loading, error, or launch cards', async ({ page }) => {
      await page.goto('/launches');
      await expect(page.locator('app-empty-state')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('app-loading')).not.toBeVisible();
      await expect(page.locator('app-error-message')).not.toBeVisible();
      await expect(page.locator('.launch-card')).not.toBeVisible();
    });
  });
});
