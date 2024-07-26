import { render, screen, waitFor } from '@testing-library/react'
import Navbar from './Navbar'

window.scrollTo = jest.fn()

test('renders the navbar correctly', async () => {
  render(<Navbar />)
  expect(screen.getByRole('navigation')).toBeVisible()
  expect(screen.getByRole('navigation')).not.toHaveClass('shadow-lg')
  await waitFor(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 51,
      writable: true,
    })
    window.dispatchEvent(new Event('scroll'))
  })
  expect(screen.getByRole('navigation')).toHaveClass('shadow-lg')
  expect(screen.getByText('Easy Returns')).toBeVisible()
  expect(screen.getByText('Easy Returns')).toHaveAttribute(
    'href',
    '/easy-returns'
  )
  expect(screen.getByText('Get Help')).toBeVisible()
  expect(screen.getByText('Get Help')).toHaveAttribute('href', '/help')
  expect(screen.getByText('Wishlist')).toBeVisible()
  expect(screen.getByText('Wishlist')).toHaveAttribute('href', '/wishlist')
  expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument()
  expect(screen.getByTestId('desktop-navbar')).toBeInTheDocument()
})
