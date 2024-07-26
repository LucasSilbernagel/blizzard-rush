import { render, screen } from '@testing-library/react'
import FallbackPage from './FallbackPage'

test('renders the 404 page correctly', () => {
  render(<FallbackPage />)
  expect(screen.getByTestId('fallback-page')).toBeVisible()
  expect(screen.getByTestId('video-source')).toBeVisible()
  expect(screen.getByTestId('video-source')).toHaveAttribute(
    'src',
    'mock-file-stub'
  )
  expect(screen.getByText('404')).toBeVisible()
  expect(screen.getByText('Page not found.')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toHaveAttribute('href', '/')
})
