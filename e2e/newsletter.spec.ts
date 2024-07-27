import { test, expect } from '@playwright/test'
import { initializeDesktopView, initializeMobileView } from './helpers'

test('subscribe to newsletter on desktop', async ({ page }) => {
  await initializeDesktopView(page)
  await page.click('text=Sign Up')
  await expect(page).toHaveTitle(/Blizzard Rush | Newsletter Signup/)
  await page.fill('input[placeholder="Email address"]', 'test@example.com')
  await page.fill('input[placeholder="First name"]', 'John')
  await page.fill('input[placeholder="Last name"]', 'Doe')
  await page.click('button:has-text("Gender")')
  await page.waitForTimeout(1000)
  await page.click('div[role="option"]:has-text("Male")')
  await page.fill('input[placeholder="Birthday"]', '1990-01-01')
  await page.click('button:has-text("Subscribe")')
  await page.waitForSelector('text=Thanks for subscribing, John!')
})

test('subscribe to newsletter on mobile', async ({ page }) => {
  await initializeMobileView(page)
  await page.click('text=Sign Up')
  await expect(page).toHaveTitle(/Blizzard Rush | Newsletter Signup/)
  await page.fill('input[placeholder="Email address"]', 'test@example.com')
  await page.fill('input[placeholder="First name"]', 'John')
  await page.fill('input[placeholder="Last name"]', 'Doe')
  await page.click('button:has-text("Gender")')
  await page.waitForTimeout(1000)
  const genderOptions = await page.$$('div[role="option"]')
  for (const option of genderOptions) {
    const textContent = await option.textContent()
    if (textContent?.includes('Male')) {
      await option.scrollIntoViewIfNeeded()
      await option.click()
      break
    }
  }
  await page.fill('input[placeholder="Birthday"]', '1990-01-01')
  await page.click('button:has-text("Subscribe")')
  await page.waitForSelector('text=Thanks for subscribing, John!')
})
