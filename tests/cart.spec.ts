import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";

test.describe("Cart Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  // Login with standard user before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test.describe("Inventory Page Tests", () => {
    // Go to inventory page before each test
    test.beforeEach(async () => {
      await inventoryPage.goto();
    });

    // Click to add cart to the first item found
    // and list, check if the cart badge/counter shows up with the value as 1
    test("should add first item to cart", async () => {
      await inventoryPage.addFirstItemToCart();
      await expect(inventoryPage.cartCounter).toHaveText("1");
    });

    test("should remove first item from cart", async () => {
      // Check if the added item can be removed if clicked again with
      // removeButton locator. Then check if the cart badge/counter is not attached (disappears from he DOM)
      await inventoryPage.addFirstItemToCart();
      await expect(inventoryPage.cartCounter).toHaveText("1");
      await inventoryPage.removeFirstItemFromCart();
      await expect(inventoryPage.cartCounter).not.toBeAttached();
    });
  });

  test.describe("Cart Page Test", () => {
    test("should add item in inventory page, and then check if it exists in the cart page", async () => {
      // Go to inventory page and add the first item to the cart
      await inventoryPage.goto();
      await inventoryPage.addFirstItemToCart();
      await expect(inventoryPage.cartCounter).toHaveText("1");

      // Navigate to the cart page and check if a .cart_item node exists
      await cartPage.goto();
      await expect(cartPage.cartItems.first()).toBeVisible();
    });

    test("should remove item from cart", async () => {
      // Go to inventory page and add the first item to the cart
      await inventoryPage.goto();
      await inventoryPage.addFirstItemToCart();
      await expect(inventoryPage.cartCounter).toHaveText("1");

      // Navigate to the cart page and check if a .cart_item node exists
      await cartPage.goto();
      await expect(cartPage.cartItems.first()).toBeVisible();

      // Remove the item from the cart
      await cartPage.removeFirstItemFromCart();
      await expect(cartPage.cartItems).toHaveCount(0);
    });
  });
});
