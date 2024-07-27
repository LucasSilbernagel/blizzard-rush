import { test, expect } from '@playwright/test'
import { initializeDesktopView, initializeMobileView } from './helpers'

test('product search returns relevant results on desktop', async ({ page }) => {
  await initializeDesktopView(page)
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
  await initializeMobileView(page)
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
