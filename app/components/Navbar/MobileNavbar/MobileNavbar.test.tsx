/* eslint-disable no-extra-semi */
import { render, screen } from '@testing-library/react'
import MobileNavbar from './MobileNavbar'
import { useStoreState } from '~/zustand-store'
import { MOCK_CHECKOUT } from '~/mocks/MockCheckout'

jest.mock('../../../zustand-store.tsx', () => ({
  useStoreState: jest.fn(),
}))

beforeEach(() => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: { lineItems: [] },
  })
})

test('renders correctly when the cart is empty', () => {
  render(<MobileNavbar />)
  expect(screen.getByText('Blizzard Rush')).toBeVisible()
  expect(screen.getByText('Blizzard Rush')).toHaveAttribute('href', '/')
  expect(screen.getByRole('searchbox')).toBeVisible()
  expect(screen.getByText('About')).toBeVisible()
  expect(screen.getByText('About')).toHaveAttribute('href', '/about')
  expect(screen.getByTestId('cart-link')).toBeVisible()
  expect(screen.getByTestId('cart-link')).toHaveAttribute('href', '/cart')
  expect(
    screen.queryByLabelText(`${MOCK_CHECKOUT.lineItems.length} items in cart`)
  ).not.toBeInTheDocument()
})

test('renders correctly when the cart has items', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: MOCK_CHECKOUT,
    isLoadingShopifyCart: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(<MobileNavbar />)
  expect(screen.getByText('Blizzard Rush')).toBeVisible()
  expect(screen.getByText('Blizzard Rush')).toHaveAttribute('href', '/')
  expect(screen.getByRole('searchbox')).toBeVisible()
  expect(screen.getByText('About')).toBeVisible()
  expect(screen.getByText('About')).toHaveAttribute('href', '/about')
  expect(screen.getByTestId('cart-link')).toBeVisible()
  expect(screen.getByTestId('cart-link')).toHaveTextContent('2')
  expect(screen.getByTestId('cart-link')).toHaveAttribute('href', '/cart')
  expect(
    screen.getByLabelText(`${MOCK_CHECKOUT.lineItems.length} items in cart`)
  ).toBeVisible()
})
