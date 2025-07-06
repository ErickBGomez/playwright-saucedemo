import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

test.describe("Cart Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test.describe("Inventory Page Tests", () => {
    // Go to inventory page, then click to add cart to the first item found
    // and list, check if the cart badge/counter shows up with the value as 1
    test("should add first item to cart", async ({ page }) => {
      await inventoryPage.goto();
      await inventoryPage.addToCartButton.first().click();
      await expect(inventoryPage.cartCounter).toHaveText("1");
    });

    test("should remove first item from cart", async ({ page }) => {
      // Check if the added item can be removed if clicked again with
      // removeButton locator. Then check if the cart badge/counter is not attached (disappears from he DOM)
      await inventoryPage.goto();
      await inventoryPage.addToCartButton.first().click();
      await expect(inventoryPage.cartCounter).toHaveText("1");
      await inventoryPage.removeButton.first().click();
      await expect(inventoryPage.cartCounter).not.toBeAttached();
    });
  });
});
