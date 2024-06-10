import { Page } from "@playwright/test"
import { createBdd } from "playwright-bdd"
import {
  chromium,
  ChromiumBrowser,
  FirefoxBrowser,
  WebKitBrowser,
  BrowserContext
} from "@playwright/test"

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser
let page: Page
let context: BrowserContext
const { Before, After } = createBdd()

Before(async function() {
  browser = await chromium.launch()
  context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: "screenshots" } : undefined,
    viewport: { width: 1200, height: 800 }
  })
  page = await context.newPage()
})

After(async function() {
  page.close()
  browser.close()
})
