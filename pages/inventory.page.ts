import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly cartCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator(".btn_primary.btn_inventory");
    this.removeButtons = page.locator(".btn_secondary.btn_inventory");
    this.cartCounter = page.locator(".shopping_cart_badge");
  }

  async goto() {
    await this.page.goto("inventory.html");
  }
}
