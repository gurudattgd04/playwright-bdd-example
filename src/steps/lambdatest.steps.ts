import { expect } from "@playwright/test"
import { createBdd } from "playwright-bdd"


const { When, Then } = createBdd()


When("I visit lambdatest playground", async function({ page }) {
    await page.goto("https://ecommerce-playground.lambdatest.io/")
})

Then("I should see the page {string}", async function ({ page }, expectedResponse) {
      console.log("Page object :", page);
      await expect(page).toHaveTitle(expectedResponse);
    }
);