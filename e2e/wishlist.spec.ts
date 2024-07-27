import { test, expect } from '@playwright/test'
import { initializeDesktopView, initializeMobileView } from './helpers'

test('adds a product to the wishlist on desktop', async ({ page }) => {
  await initializeDesktopView(page)
  await page.click('text=Wishlist')
  await expect(page).toHaveTitle(/Blizzard Rush | Wishlist/)
  await expect(page.locator('text=NO PRODUCTS FOUND')).toBeVisible()
  await page.click('text=Continue shopping')
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('text=The 3p Fulfilled Snowboard')
  await expect(page).toHaveTitle(/Blizzard Rush | The 3p Fulfilled Snowboard/)
  await page.click('text=Add to wishlist')
  await page.waitForTimeout(1000)
  await expect(
    page.locator('text=Added The 3p Fulfilled Snowboard to wishlist')
  ).toBeVisible()
  await page.click('text=Go to wishlist')
  await expect(page).toHaveTitle(/Blizzard Rush | Wishlist/)
  await expect(page.locator('text=NO PRODUCTS FOUND')).toHaveCount(0)
  await expect(
    page.locator('a:has-text("The 3p Fulfilled Snowboard")')
  ).toBeVisible()
  await page.click(
    'button[aria-label="Remove The 3p Fulfilled Snowboard from wishlist"]'
  )
  await page.waitForTimeout(1000)
  await expect(page.locator('text=The 3p Fulfilled Snowboard')).toHaveCount(0)
  await expect(page.locator('text=NO PRODUCTS FOUND')).toBeVisible()
  await page.click('text=Continue shopping')
})

test('adds a product to the wishlist on mobile', async ({ page }) => {
  await initializeMobileView(page)
  await page.click('text=Wishlist')
  await expect(page).toHaveTitle(/Blizzard Rush | Wishlist/)
  await expect(page.locator('text=NO PRODUCTS FOUND')).toBeVisible()
  await page.click('text=Continue shopping')
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('text=The 3p Fulfilled Snowboard')
  await expect(page).toHaveTitle(/Blizzard Rush | The 3p Fulfilled Snowboard/)
  await page.click('text=Add to wishlist')
  await page.waitForTimeout(1000)
  await expect(
    page.locator('text=Added The 3p Fulfilled Snowboard to wishlist')
  ).toBeVisible()
  await page.click('text=Go to wishlist')
  await expect(page).toHaveTitle(/Blizzard Rush | Wishlist/)
  await expect(page.locator('text=NO PRODUCTS FOUND')).toHaveCount(0)
  await expect(
    page.locator('a:has-text("The 3p Fulfilled Snowboard")')
  ).toBeVisible()
  await page.click(
    'button[aria-label="Remove The 3p Fulfilled Snowboard from wishlist"]'
  )
  await page.waitForTimeout(1000)
  await expect(page.locator('text=The 3p Fulfilled Snowboard')).toHaveCount(0)
  await expect(page.locator('text=NO PRODUCTS FOUND')).toBeVisible()
  await page.click('text=Continue shopping')
})
