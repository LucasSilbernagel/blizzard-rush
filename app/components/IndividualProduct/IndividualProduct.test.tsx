import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import IndividualProduct from './IndividualProduct'
import {
  MOCK_PRODUCT_WITH_VARIANTS,
  MOCK_PRODUCT_WITHOUT_VARIANTS,
  MOCK_SOLD_OUT_PRODUCT,
} from '~/mocks/MockIndividualProducts'
import { StoreProvider } from '~/zustand-store'
import { Toaster } from 'shadcn/components/ui/toaster'

test('renders a product with variants correctly', async () => {
  render(
    <StoreProvider>
      <Toaster />
      <IndividualProduct product={MOCK_PRODUCT_WITH_VARIANTS} />
    </StoreProvider>
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
  expect(
    screen.getByText(`Added ${MOCK_PRODUCT_WITH_VARIANTS.title} to cart`)
  ).toBeVisible()
  expect(screen.getByText('Add to wishlist')).toBeVisible()
  await userEvent.click(screen.getByText('Add to wishlist'))
  expect(
    screen.getByText(`Added ${MOCK_PRODUCT_WITH_VARIANTS.title} to wishlist`)
  ).toBeVisible()
})

test('renders a product without variants correctly', async () => {
  render(
    <StoreProvider>
      <Toaster />
      <IndividualProduct product={MOCK_PRODUCT_WITHOUT_VARIANTS} />
    </StoreProvider>
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
  expect(
    screen.getByText(`Added ${MOCK_PRODUCT_WITHOUT_VARIANTS.title} to cart`)
  ).toBeVisible()
  expect(screen.getByText('Add to wishlist')).toBeVisible()
  await userEvent.click(screen.getByText('Add to wishlist'))
  expect(
    screen.getByText(`Added ${MOCK_PRODUCT_WITHOUT_VARIANTS.title} to wishlist`)
  ).toBeVisible()
})

test('renders sold out product correctly', async () => {
  render(
    <StoreProvider>
      <Toaster />
      <IndividualProduct product={MOCK_SOLD_OUT_PRODUCT} />
    </StoreProvider>
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
    <StoreProvider>
      <Toaster />
      <IndividualProduct product={null} />
    </StoreProvider>
  )
  expect(
    screen.queryByAltText(MOCK_SOLD_OUT_PRODUCT.title)
  ).not.toBeInTheDocument()
  expect(screen.getByText('Product not found')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toBeVisible()
})
