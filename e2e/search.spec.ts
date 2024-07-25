import { test, expect } from '@playwright/test'

test('product search returns relevant results on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1470, height: 712 })
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
  const searchInput = page.locator(
    '[data-testid="desktop-navbar"] input[type="search"]'
  )
  await searchInput.waitFor({ state: 'visible' })
  await searchInput.fill('wax')
  await page.click(
    '[data-testid="desktop-navbar"] button[aria-label="Submit product search"]'
  )
  await expect(page).toHaveURL(/\/search\?q=wax/)
  await expect(page).toHaveTitle(/Blizzard Rush | Search/)
  await page.waitForSelector('text=SEARCH RESULTS FOR "WAX"')
  await expect(page.locator('text=Gift Card')).not.toBeVisible()
  await expect(page.locator('text=Selling Plans Ski Wax')).toBeVisible()
})

test('product search returns relevant results on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
  const searchInput = page.locator(
    '[data-testid="mobile-navbar"] input[type="search"]'
  )
  await searchInput.waitFor({ state: 'visible' })
  await searchInput.fill('wax')
  await page.click(
    '[data-testid="mobile-navbar"] button[aria-label="Submit product search"]'
  )
  await expect(page).toHaveURL(/\/search\?q=wax/)
  await expect(page).toHaveTitle(/Blizzard Rush | Search/)
  await page.waitForSelector('text=SEARCH RESULTS FOR "WAX"')
  await expect(page.locator('text=Gift Card')).not.toBeVisible()
  await expect(page.locator('text=Selling Plans Ski Wax')).toBeVisible()
})
