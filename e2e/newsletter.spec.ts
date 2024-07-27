import { test, expect } from '@playwright/test'
import { initializeDesktopView, initializeMobileView } from './helpers'

test('subscribe to newsletter on desktop', async ({ page }) => {
  initializeDesktopView(page)
  await page.click('text=Sign Up')
  await expect(page).toHaveTitle(/Blizzard Rush | Newsletter Signup/)
  await page.fill('input[placeholder="Email address"]', 'test@example.com')
  await page.fill('input[placeholder="First name"]', 'John')
  await page.fill('input[placeholder="Last name"]', 'Doe')
  await page.click('button:has-text("Gender")')
  await page.click('div[role="option"]:has-text("Male")')
  await page.fill('input[placeholder="Birthday"]', '1990-01-01')
  await page.click('button:has-text("Subscribe")')
  await page.waitForSelector('text=Thanks for subscribing, John!')
})

test('subscribe to newsletter on mobile', async ({ page }) => {
  initializeMobileView(page)
  await page.click('text=Sign Up')
  await expect(page).toHaveTitle(/Blizzard Rush | Newsletter Signup/)
  await page.fill('input[placeholder="Email address"]', 'test@example.com')
  await page.fill('input[placeholder="First name"]', 'John')
  await page.fill('input[placeholder="Last name"]', 'Doe')
  await page.click('button:has-text("Gender")')
  await page.click('div[role="option"]:has-text("Male")')
  await page.fill('input[placeholder="Birthday"]', '1990-01-01')
  await page.click('button:has-text("Subscribe")')
  await page.waitForSelector('text=Thanks for subscribing, John!')
})
