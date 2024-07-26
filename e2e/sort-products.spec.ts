import { test, expect } from '@playwright/test'

test('sorts product list on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1470, height: 712 })
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
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
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
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
