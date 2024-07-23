/* eslint-disable no-extra-semi */
import { render, screen } from '@testing-library/react'
import Cart from './Cart'
import { MOCK_CHECKOUT } from '~/mocks/MockCheckout'
import { TooltipProvider } from 'shadcn/components/ui/tooltip'
import { useStoreState } from '~/zustand-store'

jest.mock('../../zustand-store', () => ({
  useStoreState: jest.fn(),
}))

beforeEach(() => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: MOCK_CHECKOUT,
    isLoadingShopifyBuyData: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
})

test('renders cart loading state while loading Shopify storefront data', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: { lineItems: [] },
    isLoadingShopifyBuyData: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(
    <TooltipProvider>
      <Cart isLoadingStorefrontData={true} refetch={jest.fn()} error={null} />
    </TooltipProvider>
  )
  expect(screen.getByTestId('cart-skeleton')).toBeVisible()
  expect(screen.queryByTestId('cart-error-state')).not.toBeInTheDocument()
  expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
  expect(screen.queryByText('Shopping cart')).not.toBeInTheDocument()
})

test('renders cart loading state while loading shopify-buy data', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: { lineItems: undefined },
    isLoadingShopifyBuyData: true,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(
    <TooltipProvider>
      <Cart isLoadingStorefrontData={false} refetch={jest.fn()} error={null} />
    </TooltipProvider>
  )
  expect(screen.getByTestId('cart-skeleton')).toBeVisible()
  expect(screen.queryByTestId('cart-error-state')).not.toBeInTheDocument()
  expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
  expect(screen.queryByText('Shopping cart')).not.toBeInTheDocument()
})

test('renders cart error state if there is an error', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: { lineItems: undefined },
    isLoadingShopifyBuyData: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(
    <TooltipProvider>
      <Cart
        isLoadingStorefrontData={false}
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

test('renders empty cart if there are no checkout line items', () => {
  ;(useStoreState as unknown as jest.Mock).mockReturnValue({
    checkout: { lineItems: undefined },
    isLoadingShopifyBuyData: false,
    updateLineItem: jest.fn(),
    removeLineItem: jest.fn(),
  })
  render(
    <TooltipProvider>
      <Cart isLoadingStorefrontData={false} refetch={jest.fn()} error={null} />
    </TooltipProvider>
  )
  expect(screen.getByText('Your cart is empty')).toBeVisible()
  expect(screen.queryByTestId('cart-skeleton')).not.toBeInTheDocument()
  expect(screen.queryByTestId('cart-error-state')).not.toBeInTheDocument()
  expect(screen.queryByText('Shopping cart')).not.toBeInTheDocument()
})

test('renders full cart if there are checkout line items', () => {
  render(
    <TooltipProvider>
      <Cart isLoadingStorefrontData={false} refetch={jest.fn()} error={null} />
    </TooltipProvider>
  )
  expect(screen.queryByText('Shopping cart')).toBeVisible()
  expect(screen.queryByTestId('cart-skeleton')).not.toBeInTheDocument()
  expect(screen.queryByTestId('cart-error-state')).not.toBeInTheDocument()
  expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()
})
