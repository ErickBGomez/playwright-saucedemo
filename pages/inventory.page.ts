import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly cartLink: Locator;
  readonly cartCounter: Locator;
  readonly sidebarMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator(".btn_primary.btn_inventory");
    this.removeButtons = page.locator(".btn_secondary.btn_inventory");
    this.cartLink = page.locator(".shopping_cart_link");
    this.cartCounter = page.locator(".shopping_cart_badge");
    this.sidebarMenu = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByRole("link", { name: "Logout" });
  }

  async goto() {
    await this.page.goto("inventory.html");
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async removeFirstItemFromCart() {
    await this.removeButtons.first().click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openSidebarMenu() {
    await this.sidebarMenu.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
