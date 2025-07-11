import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { config } from "../utils/config";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Go to login page before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test.describe("Successful Login", () => {
    // For each valid user saved in this array, create a test
    // Even tough problem_user and performance_glitch_user are not standard users,
    // these can indeed login successfully
    // Approach made by the official documentation: https://playwright.dev/docs/test-parameterize#parameterized-tests
    config.validCredentials.forEach(({ username, password }) => {
      test(`should login successfully with ${username}`, async ({ page }) => {
        await loginPage.login(username, password);
        await expect(page.url()).toContain("/inventory.html");
      });
    });
  });

  test.describe("Failed Login", () => {
    // Now with invalid users
    // locked_out_user is considered as invalid because it cannot
    // login to the page. I also considered invalid_user as a invented
    // user that does not exist in the system, and also i added blank credentials values.
    config.invalidCredentials.forEach(({ username, password }) => {
      test(`should show error for invalid credentials: ${username}`, async () => {
        await loginPage.login(username, password);
        await expect(loginPage.errorMessage).toBeVisible();
      });
    });
  });

  test.describe("Log out Tests", () => {
    test("should log out successfully", async ({ page }) => {
      // Login with standard user
      await loginPage.login("standard_user", "secret_sauce");

      // Check if the current page is the inventory page
      await expect(page.url()).toContain("/inventory.html");

      // Open sidebar menu and click logout
      await inventoryPage.openSidebarMenu();

      // Click the logout link
      await inventoryPage.logout();

      // Check if current page is the login page
      await expect(page.url()).toContain("/index.html");
    });
  });
});
