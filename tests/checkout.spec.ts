import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { config } from "../utils/config";

test.describe("Checkout Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let validUser: { username: string; password: string };

  // Login with standard user before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    validUser = config.validCredentials[0];

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
  });

  test.describe("Perform Complete Checkout Flow", () => {
    test("should complete step one of checkout", async ({ page }) => {
      // Add item from inventory
      await inventoryPage.goto();
      await inventoryPage.addToCartButtons.first().click();
      await expect(inventoryPage.cartCounter).toBeVisible();
      await expect(inventoryPage.cartCounter).toHaveText("1");

      // Navigate to cart and verify item exists
      await cartPage.goto();
      await expect(cartPage.cartItems).toHaveCount(1);
      await expect(cartPage.cartItems.first()).toBeVisible();

      // Go to checkout step one
      await cartPage.proceedToCheckout();
      await expect(page.url()).toContain("checkout-step-one.html");

      // Check if input are empty when loading the page
      await expect(checkoutPage.firstNameInput).toBeVisible();
      await expect(checkoutPage.firstNameInput).toBeEmpty();
      await expect(checkoutPage.lastNameInput).toBeVisible();
      await expect(checkoutPage.lastNameInput).toBeEmpty();
      await expect(checkoutPage.postalCodeInput).toBeVisible();
      await expect(checkoutPage.postalCodeInput).toBeEmpty();

      // Fill the checkout form with required information
      await checkoutPage.fillCheckoutForm("Erick", "Gomez", "12345");

      // Verify form fields are filled
      await expect(checkoutPage.firstNameInput).toHaveValue("Erick");
      await expect(checkoutPage.lastNameInput).toHaveValue("Gomez");
      await expect(checkoutPage.postalCodeInput).toHaveValue("12345");

      // Go to next step
      await checkoutPage.continueToStepTwo();
      await expect(page.url()).toContain("checkout-step-two.html");
    });

    test("should go to step two after filling form", async ({ page }) => {
      // Add item from inventory
      await inventoryPage.goto();
      await inventoryPage.addToCartButtons.first().click();
      await expect(inventoryPage.cartCounter).toBeVisible();
      await expect(inventoryPage.cartCounter).toHaveText("1");

      // Navigate to cart and proceed to checkout
      await cartPage.goto();
      await expect(cartPage.cartItems).toHaveCount(1);
      await cartPage.proceedToCheckout();
      await expect(page.url()).toContain("checkout-step-one.html");

      // Check if input are empty when loading the page
      await expect(checkoutPage.firstNameInput).toBeVisible();
      await expect(checkoutPage.firstNameInput).toBeEmpty();
      await expect(checkoutPage.lastNameInput).toBeVisible();
      await expect(checkoutPage.lastNameInput).toBeEmpty();
      await expect(checkoutPage.postalCodeInput).toBeVisible();
      await expect(checkoutPage.postalCodeInput).toBeEmpty();

      // Fill the checkout form
      await checkoutPage.fillCheckoutForm("Erick", "Gomez", "12345");

      // Verify form fields are filled
      await expect(checkoutPage.firstNameInput).toHaveValue("Erick");
      await expect(checkoutPage.lastNameInput).toHaveValue("Gomez");
      await expect(checkoutPage.postalCodeInput).toHaveValue("12345");

      // Continue to step two
      await checkoutPage.continueToStepTwo();
      await expect(page.url()).toContain("checkout-step-two.html");
    });

    test("should complete checkout process", async ({ page }) => {
      // Add item to cart from inventory page
      await inventoryPage.goto();
      await inventoryPage.addFirstItemToCart();
      await expect(inventoryPage.cartCounter).toBeVisible();
      await expect(inventoryPage.cartCounter).toHaveText("1");

      // Go to cart and verify item was added
      await cartPage.goto();
      await expect(cartPage.cartItems).toHaveCount(1);
      await expect(cartPage.cartItems.first()).toBeVisible();

      // Proceed to checkout step one
      await cartPage.proceedToCheckout();
      await expect(page.url()).toContain("checkout-step-one.html");

      // Fill checkout form
      await checkoutPage.fillCheckoutForm("Erick", "Gomez", "12345");
      await checkoutPage.continueToStepTwo();

      // Verify to be on step two
      await expect(page.url()).toContain("checkout-step-two.html");

      // Finish checkout
      await checkoutPage.finishCheckout();

      // Verify completion
      await expect(page.url()).toContain("checkout-complete.html");
      await expect(checkoutPage.completeHeader).toBeVisible();
      await expect(checkoutPage.completeHeader).toHaveText(
        "THANK YOU FOR YOUR ORDER"
      );
    });
  });

  test.describe("Checkout Form Validation", () => {
    test.beforeEach(async ({ page }) => {
      // Add item and navigate to checkout for each validation test
      await inventoryPage.goto();
      await inventoryPage.addToCartButtons.first().click();
      await expect(inventoryPage.cartCounter).toBeVisible();
      await expect(inventoryPage.cartCounter).toHaveText("1");
      await cartPage.goto();
      await expect(cartPage.cartItems).toHaveCount(1);
      await cartPage.proceedToCheckout();
      await expect(page.url()).toContain("checkout-step-one.html");
    });

    test("should show error when first name is missing", async ({ page }) => {
      await checkoutPage.fillCheckoutForm("", "Gomez", "12345");
      await checkoutPage.continueToStepTwo();
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(
        "First Name is required"
      );
      // Verify we're still on step one
      await expect(page.url()).toContain("checkout-step-one.html");
    });

    test("should show error when last name is missing", async ({ page }) => {
      await checkoutPage.fillCheckoutForm("Erick", "", "12345");
      await checkoutPage.continueToStepTwo();
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(
        "Last Name is required"
      );
      // Verify we're still on step one
      await expect(page.url()).toContain("checkout-step-one.html");
    });

    test("should show error when postal code is missing", async ({ page }) => {
      await checkoutPage.fillCheckoutForm("Erick", "Gomez", "");
      await checkoutPage.continueToStepTwo();
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(
        "Postal Code is required"
      );
      // Verify we're still on step one
      await expect(page.url()).toContain("checkout-step-one.html");
    });

    test("should show error when all fields are empty", async ({ page }) => {
      await checkoutPage.fillCheckoutForm("", "", "");
      await checkoutPage.continueToStepTwo();
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(
        "First Name is required"
      );
      // Verify we're still on step one
      await expect(page.url()).toContain("checkout-step-one.html");
    });
  });
});
