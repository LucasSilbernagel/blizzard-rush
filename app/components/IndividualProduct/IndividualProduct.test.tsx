import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import IndividualProduct from './IndividualProduct'
import {
  MOCK_PRODUCT_WITH_VARIANTS,
  MOCK_PRODUCT_WITHOUT_VARIANTS,
  MOCK_SOLD_OUT_PRODUCT,
} from '~/mocks/MockIndividualProducts'
import { Toaster } from 'shadcn/components/ui/toaster'
import { useStoreState } from '~/zustand-store'

jest.mock('~/zustand-store', () => ({
  useStoreState: jest.fn(),
}))

const addVariantToCart = jest.fn()
const setDidJustAddToCart = jest.fn()
const setWishlistTitles = jest.fn()
;(useStoreState as unknown as jest.Mock).mockReturnValue({
  cart: [],
  wishlistTitles: [],
  addVariantToCart,
  didJustAddToCart: false,
  setDidJustAddToCart,
  setWishlistTitles,
})

test('renders a product with variants correctly', async () => {
  render(
    <>
      <Toaster />
      <IndividualProduct product={MOCK_PRODUCT_WITH_VARIANTS} />
    </>
  )
  expect(screen.getByAltText(MOCK_PRODUCT_WITH_VARIANTS.title)).toBeVisible()
  expect(screen.getByAltText(MOCK_PRODUCT_WITH_VARIANTS.title)).toHaveAttribute(
    'src',
    MOCK_PRODUCT_WITH_VARIANTS.featuredImage?.url
  )
  expect(screen.getByText(MOCK_PRODUCT_WITH_VARIANTS.title)).toBeVisible()
  expect(screen.getByTestId('product-price')).toBeVisible()
  expect(screen.getByTestId('product-price')).toHaveTextContent(
    `Price: ${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      Number(MOCK_PRODUCT_WITH_VARIANTS.priceRange?.minVariantPrice?.amount)
    )}`
  )
  expect(screen.getByTestId('selected-variant')).toBeVisible()
  expect(screen.getByTestId('selected-variant')).toHaveTextContent(
    `Variant: ${MOCK_PRODUCT_WITH_VARIANTS.variants.edges[0].node.title}`
  )
  MOCK_PRODUCT_WITH_VARIANTS.variants.edges.forEach((edge) => {
    expect(screen.getByRole('radio', { name: edge.node.title })).toBeVisible()
  })
  await userEvent.click(
    screen.getByRole('radio', {
      name: MOCK_PRODUCT_WITH_VARIANTS.variants.edges[1].node.title,
    })
  )
  expect(screen.getByTestId('selected-variant')).toHaveTextContent(
    `Variant: ${MOCK_PRODUCT_WITH_VARIANTS.variants.edges[1].node.title}`
  )
  expect(screen.getByText('Add to cart')).toBeVisible()
  await userEvent.click(screen.getByText('Add to cart'))
  expect(addVariantToCart).toHaveBeenCalledWith(
    MOCK_PRODUCT_WITH_VARIANTS.variants.edges[1].node.id,
    '1'
  )
  expect(screen.getByText('Add to wishlist')).toBeVisible()
  await userEvent.click(screen.getByText('Add to wishlist'))
  expect(
    screen.getByText(`Added ${MOCK_PRODUCT_WITH_VARIANTS.title} to wishlist`)
  ).toBeVisible()
})

test('renders a product without variants correctly', async () => {
  render(
    <>
      <Toaster />
      <IndividualProduct product={MOCK_PRODUCT_WITHOUT_VARIANTS} />
    </>
  )
  expect(screen.getByAltText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)).toBeVisible()
  expect(
    screen.getByAltText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)
  ).toHaveAttribute('src', MOCK_PRODUCT_WITHOUT_VARIANTS.featuredImage?.url)
  expect(screen.getByText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)).toBeVisible()
  expect(screen.getByTestId('product-price')).toBeVisible()
  expect(screen.getByTestId('product-price')).toHaveTextContent(
    `Price: ${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      Number(MOCK_PRODUCT_WITHOUT_VARIANTS.priceRange?.minVariantPrice?.amount)
    )}`
  )
  expect(screen.queryByTestId('selected-variant')).not.toBeInTheDocument()
  expect(screen.getByText('Add to cart')).toBeVisible()
  await userEvent.click(screen.getByText('Add to cart'))
  expect(addVariantToCart).toHaveBeenCalledWith(
    MOCK_PRODUCT_WITHOUT_VARIANTS.variants.edges[0].node.id,
    '1'
  )
  expect(screen.getByText('Add to wishlist')).toBeVisible()
  await userEvent.click(screen.getByText('Add to wishlist'))
  expect(
    screen.getByText(`Added ${MOCK_PRODUCT_WITHOUT_VARIANTS.title} to wishlist`)
  ).toBeVisible()
})

test('renders sold out product correctly', async () => {
  render(
    <>
      <Toaster />
      <IndividualProduct product={MOCK_SOLD_OUT_PRODUCT} />
    </>
  )
  expect(screen.getByAltText(MOCK_SOLD_OUT_PRODUCT.title)).toBeVisible()
  expect(screen.getByAltText(MOCK_SOLD_OUT_PRODUCT.title)).toHaveAttribute(
    'src',
    MOCK_SOLD_OUT_PRODUCT.featuredImage?.url
  )
  expect(screen.getByText(MOCK_SOLD_OUT_PRODUCT.title)).toBeVisible()
  expect(screen.getByTestId('product-price')).toBeVisible()
  expect(screen.getByTestId('product-price')).toHaveTextContent(
    `Price: ${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(
      Number(MOCK_SOLD_OUT_PRODUCT.priceRange?.minVariantPrice?.amount)
    )}`
  )
  expect(screen.queryByTestId('selected-variant')).not.toBeInTheDocument()
  expect(screen.queryByText('Add to cart')).not.toBeInTheDocument()
  expect(screen.getByText('Sold out!')).toBeVisible()
  expect(screen.getByText('Add to wishlist')).toBeVisible()
  await userEvent.click(screen.getByText('Add to wishlist'))
  expect(
    screen.getByText(`Added ${MOCK_SOLD_OUT_PRODUCT.title} to wishlist`)
  ).toBeVisible()
})

test('fails to render a product', async () => {
  render(
    <>
      <Toaster />
      <IndividualProduct product={null} />
    </>
  )
  expect(
    screen.queryByAltText(MOCK_SOLD_OUT_PRODUCT.title)
  ).not.toBeInTheDocument()
  expect(screen.getByText('Product not found')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toBeVisible()
})
