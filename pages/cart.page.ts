import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.removeButtons = page.locator(".btn_secondary.cart_button");
  }

  async goto() {
    await this.page.goto("cart.html");
  }
}
