import { Page, expect } from '@playwright/test'
import getEnv from '~/get-env'

export const initializeDesktopView = async (page: Page) => {
  const env = getEnv()
  await page.setViewportSize({ width: 1470, height: 712 })
  await page.goto(env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
}

export const initializeMobileView = async (page: Page) => {
  const env = getEnv()
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto(env.VERCEL_PREVIEW_URL || 'http://localhost:5173/', {
    waitUntil: 'networkidle',
  })
  await expect(page).toHaveTitle(/Blizzard Rush | Shop Snowboards/)
}
