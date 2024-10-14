/* eslint-disable no-extra-semi */
import { render, screen } from '@testing-library/react'
import Cart from './Cart'
import { MOCK_CART } from '~/mocks/MockCart'
import { TooltipProvider } from 'shadcn/components/ui/tooltip'
import { useStoreState } from '~/zustand-store'

jest.mock('../../zustand-store', () => ({
  useStoreState: jest.fn(),
}))

beforeEach(() => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    cart: MOCK_CART,
    isLoadingShopifyCart: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
})

test('renders cart error state if there is an error', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    cart: { lineItems: undefined },
    isLoadingShopifyCart: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(
    <TooltipProvider>
      <Cart
        refetch={jest.fn()}
        error={{
          message: 'Something went wrong, please try again later.',
          name: 'Error',
        }}
      />
    </TooltipProvider>
  )
  expect(screen.getByTestId('cart-error-state')).toBeVisible()
  expect(screen.getByText('Error')).toBeVisible()
  expect(
    screen.getByText('Something went wrong, please try again later.')
  ).toBeVisible()
  expect(screen.queryByTestId('cart-skeleton')).not.toBeInTheDocument()
  expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
  expect(screen.queryByText('Shopping cart')).not.toBeInTheDocument()
})

test('renders empty cart if there are no cart line items', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    cart: { lineItems: undefined },
    isLoadingShopifyCart: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(
    <TooltipProvider>
      <Cart refetch={jest.fn()} error={null} />
    </TooltipProvider>
  )
  expect(screen.getByText('Your cart is empty')).toBeVisible()
  expect(screen.queryByTestId('cart-skeleton')).not.toBeInTheDocument()
  expect(screen.queryByTestId('cart-error-state')).not.toBeInTheDocument()
  expect(screen.queryByText('Shopping cart')).not.toBeInTheDocument()
})

test('renders full cart if there are cart line items', () => {
  render(
    <TooltipProvider>
      <Cart refetch={jest.fn()} error={null} />
    </TooltipProvider>
  )
  expect(screen.queryByText('Shopping cart')).toBeVisible()
  expect(screen.queryByTestId('cart-skeleton')).not.toBeInTheDocument()
  expect(screen.queryByTestId('cart-error-state')).not.toBeInTheDocument()
  expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
})
