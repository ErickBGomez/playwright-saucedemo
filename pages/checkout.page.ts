import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;
    // Step One form elements
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.getByRole("button", { name: "CONTINUE" });
    this.errorMessage = page.locator('[data-test="error"]');

    // Step Two elements
    this.finishButton = page.getByRole("link", { name: "FINISH" });

    // Completion page elements
    this.completeHeader = page.getByRole("heading", {
      name: "THANK YOU FOR YOUR ORDER",
    });
    this.completeText = page.getByText("Your order has been");
  }

  async goto() {
    await this.page.goto("checkout-step-one.html");
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToStepTwo() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.fillCheckoutForm(firstName, lastName, postalCode);
    await this.continueToStepTwo();
    await this.finishCheckout();
  }
}
