import { render, screen, within } from '@testing-library/react'
import FullCart from './FullCart'
import { TooltipProvider } from 'shadcn/components/ui/tooltip'
import { calculateCartSubtotal, getItemSubtotal } from '~/utils/priceFormatting'
import { CheckoutLineItem } from 'shopify-buy'
import { MOCK_CART_PRODUCT_DATA } from '~/mocks/MockCartProductData'
import { MOCK_CHECKOUT } from '~/mocks/MockCheckout'
import { userEvent } from '@testing-library/user-event'

const mockUpdateLineItem = jest.fn()
const mockRemoveLineItem = jest.fn()

jest.mock('../../../zustand-store.tsx', () => ({
  useStoreState: () => ({
    checkout: MOCK_CHECKOUT,
    isLoadingShopifyBuyData: false,
    updateLineItem: mockUpdateLineItem,
    removeLineItem: mockRemoveLineItem,
  }),
}))

test('renders a shopping cart with items correctly', () => {
  render(
    <TooltipProvider>
      <FullCart data={MOCK_CART_PRODUCT_DATA} refetch={jest.fn()} />
    </TooltipProvider>
  )
  expect(screen.getByText('Continue shopping')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toHaveAttribute('href', '/')
  expect(screen.getByText('Shopping cart')).toBeVisible()
  expect(screen.getByText('Cart item image')).toBeInTheDocument()
  expect(screen.getByText('Cart item name')).toBeInTheDocument()
  expect(screen.getByText('Cart item quantity')).toBeInTheDocument()
  expect(screen.getByText('Remove cart item')).toBeInTheDocument()
  expect(screen.getByText('Cart item subtotal')).toBeInTheDocument()
  MOCK_CHECKOUT.lineItems.forEach(async (lineItem, index) => {
    const cartItem = screen.getByTestId(`cart-item-${lineItem.id}`)
    const { getByTestId } = within(cartItem)
    expect(getByTestId('cart-item-image-link')).toBeVisible()
    expect(getByTestId('cart-item-image-link')).toHaveAttribute(
      'href',
      `/products/${lineItem.variant?.product.id.split('/').at(-1)}`
    )
    expect(screen.getByAltText(lineItem.title)).toBeVisible()
    expect(screen.getByAltText(lineItem.title)).toHaveAttribute(
      'src',
      lineItem.variant?.image.src
    )
    expect(getByTestId('cart-item-title-link')).toBeVisible()
    expect(getByTestId('cart-item-title-link')).toHaveAttribute(
      'href',
      `/products/${lineItem.variant?.product.id.split('/').at(-1)}`
    )
    expect(screen.getByText(lineItem.title)).toBeVisible()
    if (
      lineItem.variant?.title &&
      lineItem.variant?.title !== 'Default Title'
    ) {
      expect(screen.getByText(lineItem.variant.title)).toBeVisible()
    }
    if (
      lineItem.variant?.title &&
      lineItem.variant?.title === 'Default Title'
    ) {
      expect(screen.queryByText(lineItem.variant.title)).not.toBeInTheDocument()
    }
    const quantitySelect = screen.getAllByRole('combobox')[index]
    expect(quantitySelect).toBeVisible()
    expect(quantitySelect).toHaveTextContent(String(lineItem.quantity))
    expect(screen.getAllByText('Remove')[index]).toBeVisible()
    expect(screen.getAllByTestId('item-subtotal')[index]).toBeVisible()
    expect(screen.getAllByTestId('item-subtotal')[index]).toHaveTextContent(
      getItemSubtotal(lineItem as unknown as CheckoutLineItem)
    )
  })
  expect(screen.getByText('Subtotal')).toBeVisible()
  expect(
    screen.getByText(calculateCartSubtotal(MOCK_CHECKOUT.lineItems))
  ).toBeVisible()
  expect(screen.getByText('Check Out')).toBeVisible()
  expect(screen.getByText('Check Out')).toHaveAttribute(
    'href',
    MOCK_CHECKOUT.webUrl
  )
  expect(
    screen.getByText('Shipping & taxes calculated at checkout')
  ).toBeVisible()
})

test('updates the quantity of a cart item', async () => {
  render(
    <TooltipProvider>
      <FullCart data={MOCK_CART_PRODUCT_DATA} refetch={jest.fn()} />
    </TooltipProvider>
  )
  expect(screen.getByText('Shopping cart')).toBeVisible()
  expect(screen.getAllByRole('combobox')[0]).toHaveTextContent('2')
  await userEvent.click(screen.getAllByRole('combobox')[0])
  await userEvent.click(screen.getByRole('option', { name: '3' }))
  expect(mockUpdateLineItem).toHaveBeenCalled()
  expect(mockUpdateLineItem).toHaveBeenCalledTimes(1)
})

test('removes an item from the cart', async () => {
  render(
    <TooltipProvider>
      <FullCart data={MOCK_CART_PRODUCT_DATA} refetch={jest.fn()} />
    </TooltipProvider>
  )
  expect(screen.getByText('Shopping cart')).toBeVisible()
  expect(screen.getAllByRole('combobox')[1]).toHaveTextContent('1')
  await userEvent.click(screen.getAllByText('Remove')[1])
  expect(mockRemoveLineItem).toHaveBeenCalled()
  expect(mockRemoveLineItem).toHaveBeenCalledTimes(1)
})
