import { test, expect } from '@playwright/test'
import { initializeDesktopView, initializeMobileView } from './helpers'

test('purchase a product on desktop', async ({ page }) => {
  await initializeDesktopView(page)
  await page.click('text=Cart')
  await expect(page).toHaveTitle(/Blizzard Rush | Cart/)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toBeVisible()
  await page.click('text=Continue shopping')
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('text=The Complete Snowboard')
  await expect(page).toHaveTitle(/Blizzard Rush | The Complete Snowboard/)
  await page.click('text=Powder')
  await page.click('text=Add to cart')
  await expect(
    page.locator('span:has-text("Added The Complete Snowboard to cart")')
  ).toBeVisible()
  await page.click('text=Go to cart')
  await expect(page).toHaveTitle(/Blizzard Rush | Cart/)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toHaveCount(0)
  await expect(
    page.locator('a:has-text("The Complete Snowboard")')
  ).toBeVisible()
  await expect(page.locator('text=Powder')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$699.95')
  await expect(page.getByText('$').nth(1)).toHaveText('$699.95')
  await expect(page.getByRole('combobox')).toHaveText('1')
  await page.click('button:has-text("1")')
  await page.click('div[role="option"]:has-text("2")')
  await expect(page.locator('span:has-text("Updated cart")')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$1,399.90')
  await expect(page.getByText('$').nth(1)).toHaveText('$1,399.90')
  await page.click('button:has-text("Remove")')
  await expect(page.locator('span:has-text("Updated cart")')).toBeVisible()
  await expect(
    page.locator('a:has-text("The Complete Snowboard")')
  ).toHaveCount(0)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toBeVisible()
  await page.click('text=Continue shopping')
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('text=The Complete Snowboard')
  await expect(page).toHaveTitle(/Blizzard Rush | The Complete Snowboard/)
  await page.click('text=Electric')
  await page.click('text=Add to cart')
  await expect(
    page.locator('span:has-text("Added The Complete Snowboard to cart")')
  ).toBeVisible()
  await page.click('text=Go to cart')
  await expect(page).toHaveTitle(/Blizzard Rush | Cart/)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toHaveCount(0)
  await expect(
    page.locator('a:has-text("The Complete Snowboard")')
  ).toBeVisible()
  await expect(page.locator('text=Electric')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$699.95')
  await expect(page.getByText('$').nth(1)).toHaveText('$699.95')
  await expect(page.getByRole('combobox')).toHaveText('1')
  await page.click('button:has-text("1")')
  await page.click('div[role="option"]:has-text("3")')
  await expect(page.locator('span:has-text("Updated cart")')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$2,099.85')
  await expect(page.getByText('$').nth(1)).toHaveText('$2,099.85')
  await page.click('text=Check Out')
})

test('purchase a product on mobile', async ({ page }) => {
  await initializeMobileView(page)
  await page.click('data-testid=cart-link')
  await expect(page).toHaveTitle(/Blizzard Rush | Cart/)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toBeVisible()
  await page.click('text=Continue shopping')
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('text=The Complete Snowboard')
  await expect(page).toHaveTitle(/Blizzard Rush | The Complete Snowboard/)
  await page.click('text=Powder')
  await page.click('text=Add to cart')
  await expect(
    page.locator('span:has-text("Added The Complete Snowboard to cart")')
  ).toBeVisible()
  await page.click('text=Go to cart')
  await expect(page).toHaveTitle(/Blizzard Rush | Cart/)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toHaveCount(0)
  await expect(
    page.locator('a:has-text("The Complete Snowboard")')
  ).toBeVisible()
  await expect(page.locator('text=Powder')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$699.95')
  await expect(page.getByText('$').nth(1)).toHaveText('$699.95')
  await expect(page.getByRole('combobox')).toHaveText('1')
  await page.click('button:has-text("1")')
  await page.click('div[role="option"]:has-text("2")')
  await expect(page.locator('span:has-text("Updated cart")')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$1,399.90')
  await expect(page.getByText('$').nth(1)).toHaveText('$1,399.90')
  await page.click('button:has-text("Remove")')
  await expect(page.locator('span:has-text("Updated cart")')).toBeVisible()
  await expect(
    page.locator('a:has-text("The Complete Snowboard")')
  ).toHaveCount(0)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toBeVisible()
  await page.click('text=Continue shopping')
  await page.waitForSelector('[data-testid="product-list"]')
  await page.click('text=The Complete Snowboard')
  await expect(page).toHaveTitle(/Blizzard Rush | The Complete Snowboard/)
  await page.click('text=Electric')
  await page.click('text=Add to cart')
  await expect(
    page.locator('span:has-text("Added The Complete Snowboard to cart")')
  ).toBeVisible()
  await page.click('text=Go to cart')
  await expect(page).toHaveTitle(/Blizzard Rush | Cart/)
  await expect(page.locator('text=YOUR CART IS EMPTY')).toHaveCount(0)
  await expect(
    page.locator('a:has-text("The Complete Snowboard")')
  ).toBeVisible()
  await expect(page.locator('text=Electric')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$699.95')
  await expect(page.getByText('$').nth(1)).toHaveText('$699.95')
  await expect(page.getByRole('combobox')).toHaveText('1')
  await page.click('button:has-text("1")')
  await page.click('div[role="option"]:has-text("3")')
  await expect(page.locator('span:has-text("Updated cart")')).toBeVisible()
  await expect(page.getByTestId('item-subtotal')).toHaveText('$2,099.85')
  await expect(page.getByText('$').nth(1)).toHaveText('$2,099.85')
  await page.click('text=Check Out')
})
