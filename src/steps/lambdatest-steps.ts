import { expect } from "@playwright/test"
import { createBdd } from "playwright-bdd"
import { DataTable } from "@cucumber/cucumber"

const { When, Then } = createBdd()

When("I visit lambdatest playground", async function({ page }) {
  await page.goto("https://ecommerce-playground.lambdatest.io/")
})

Then("I should see the page {string}", async function(
  { page },
  expectedPageTitle
) {
  await expect(page).toHaveTitle(expectedPageTitle)
})

When("I login with username {string} and password {string}", async function(
  { page },
  username,
  password
) {
  await page.locator("[name='email']").fill(username)
  await page.locator("[name='password']").fill(password)
  const requestTest = page.waitForResponse(async res => {
    if (res.url().includes("/index.php")) {
      return true
    }
    return false
  })
  await page.getByRole("button", { name: "Login" }).click()
  await requestTest
})

When("I logout", async function({ page }) {
  await page.getByRole("button", { name: " My account" }).hover()
  await page.getByRole("link", { name: "Logout", exact: true }).click()
})

When("I access HTC product", async function({ page }) {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=product/product&path=57&product_id=28"
  )
})

Then("I should see product details", async function(
  { page },
  dataTable: DataTable
) {
  await Promise.all(
    Object.keys(dataTable.rowsHash()).map(async key => {
      const value = await page
        .locator(
          `//li/span[contains(@class, 'ls-label') and contains(text(), '${key}')]/following-sibling::*[1]`
        )
        .innerText()
      await expect(value).toBe(await dataTable.rowsHash()[key])
    })
  )
})

When("I visit lambdatest playground login page", async function({ page }) {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  )
})

When("I search for product {string}", async function({ page }, searchItem) {
  await page.locator("#main-header [name='search']").fill("ipod shuffle")
  await page.locator("#main-header .search-button button").click()
})

Then("I should see {int} products in the search result page", async function({
  page
}) {
  await expect(
    page.locator(".content-products .product-layout .title")
  ).toHaveCount(4)
})
