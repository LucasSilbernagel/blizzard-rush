import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('renders the footer correctly', () => {
  render(<Footer />)
  expect(screen.getByText('30 Days Easy Returns')).toBeVisible()
  expect(screen.getByText('30 Days Easy Returns')).toHaveAttribute(
    'href',
    '/easy-returns'
  )
  expect(
    screen.getByText('Free Shipping on orders of $98+ (Regular Price Items)')
  ).toBeVisible()
  expect(
    screen.getByText('Free Shipping on orders of $98+ (Regular Price Items)')
  ).toHaveAttribute('href', '/free-shipping')
  expect(screen.getByText('We Ship from Canada')).toBeVisible()
  expect(screen.getByText('We Ship from Canada')).toHaveAttribute(
    'href',
    '/shipping-policy'
  )
  expect(screen.getByText('Join our newsletter')).toBeVisible()
  expect(
    screen.getByText(
      'Join our mailing list! Subscribe to the Blizzard Rush Newsletter and save 10% on your next order.'
    )
  ).toBeVisible()
  expect(screen.getByText('Sign Up')).toBeVisible()
  expect(screen.getByText('Sign Up')).toHaveAttribute(
    'href',
    '/newsletter-signup'
  )
  expect(screen.getByTestId('email-signup-disclaimer')).toBeVisible()
  expect(screen.getByTestId('email-signup-disclaimer')).toHaveTextContent(
    'By entering your email, you agree to our Privacy Policy and Terms of Use, including receipt of emails and promotions. You can unsubscribe at any time.'
  )
  expect(screen.getByText('Privacy Policy and Terms of Use')).toBeVisible()
  expect(screen.getByText('Privacy Policy and Terms of Use')).toHaveAttribute(
    'href',
    'privacy-policy-and-terms-of-use'
  )
  expect(screen.getByText('Wishlist')).toBeVisible()
  expect(screen.getByText('Wishlist')).toHaveAttribute('href', '/wishlist')
  expect(screen.getByText('About')).toBeVisible()
  expect(screen.getByText('About')).toHaveAttribute('href', '/about')
  expect(screen.getByText('Get Help')).toBeVisible()
  expect(screen.getByText('Get Help')).toHaveAttribute('href', '/help')
  expect(screen.getByText('Easy Returns')).toBeVisible()
  expect(screen.getByText('Easy Returns')).toHaveAttribute(
    'href',
    '/easy-returns'
  )
  expect(screen.getByText('Free Shipping')).toBeVisible()
  expect(screen.getByText('Free Shipping')).toHaveAttribute(
    'href',
    '/free-shipping'
  )
  expect(screen.getByText('Shipping Policy')).toBeVisible()
  expect(screen.getByText('Shipping Policy')).toHaveAttribute(
    'href',
    '/shipping-policy'
  )
  expect(screen.getByLabelText('Facebook')).toBeVisible()
  expect(screen.getByLabelText('Instagram')).toBeVisible()
  expect(screen.getByLabelText('YouTube')).toBeVisible()
  expect(screen.getByText('Built by')).toBeVisible()
  expect(screen.getByText('Lucas Silbernagel')).toBeVisible()
  expect(screen.getByText('Lucas Silbernagel')).toHaveAttribute(
    'href',
    'https://lucassilbernagel.com/'
  )
  expect(screen.getByText('Design inspiration:')).toBeVisible()
  expect(screen.getByText('Empire')).toBeVisible()
  expect(screen.getByText('Empire')).toHaveAttribute(
    'href',
    'https://thinkempire.com/collections/snowboards'
  )
})
