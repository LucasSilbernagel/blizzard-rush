import { Page, expect } from '@playwright/test'

export const initializeDesktopView = async (page: Page) => {
  await page.setViewportSize({ width: 1470, height: 712 })
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
}

export const initializeMobileView = async (page: Page) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(process.env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
}
