import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.removeButtons = page.locator(".btn_secondary.cart_button");
    this.checkoutButton = page.locator("#checkout");
    this.continueShoppingButton = page.locator("#continue-shopping");
  }

  async goto() {
    await this.page.goto("cart.html");
  }

  async removeFirstItemFromCart() {
    await this.removeButtons.first().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
