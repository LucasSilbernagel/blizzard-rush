import { test } from '@playwright/test'
import { initializeDesktopView, initializeMobileView } from './helpers'

test('sorts product list on desktop', async ({ page }) => {
  initializeDesktopView(page)
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('button:has-text("Price, high-low")')
  await page.click('div[role="option"]:has-text("Price, low-high")')
  await page.waitForTimeout(1000)
  const productPrices = await page.$$eval('div.product-price', (elements) =>
    elements
      .filter((el) => el instanceof HTMLElement)
      .map((el) => parseFloat(el.innerText.replace('$', '')))
  )
  const isSorted = productPrices.every(
    (price, index, arr) => !index || arr[index - 1] <= price
  )
  console.assert(isSorted, 'Products are not sorted by price low to high')
})

test('sorts product list on mobile', async ({ page }) => {
  initializeMobileView(page)
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('button:has-text("Price, high-low")')
  await page.click('div[role="option"]:has-text("Price, low-high")')
  await page.waitForTimeout(1000)
  const productPrices = await page.$$eval('div.product-price', (elements) =>
    elements
      .filter((el) => el instanceof HTMLElement)
      .map((el) => parseFloat(el.innerText.replace('$', '')))
  )
  const isSorted = productPrices.every(
    (price, index, arr) => !index || arr[index - 1] <= price
  )
  console.assert(isSorted, 'Products are not sorted by price low to high')
})
