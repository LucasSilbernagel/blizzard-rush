import { render, screen } from '@testing-library/react'
import ProductListItem from './ProductListItem'
import {
  MOCK_PRODUCT_WITH_VARIANTS,
  MOCK_PRODUCT_WITHOUT_VARIANTS,
  MOCK_SOLD_OUT_PRODUCT,
} from '~/mocks/MockIndividualProducts'

test('renders product with variants on the wishlist page', async () => {
  render(
    <ProductListItem
      product={MOCK_PRODUCT_WITH_VARIANTS}
      isWishlistPage={true}
    />
  )
  expect(
    screen.getByLabelText(
      `Remove ${MOCK_PRODUCT_WITH_VARIANTS.title} from wishlist`
    )
  ).toBeVisible()
  expect(screen.getByTestId('product-link')).toBeVisible()
  expect(screen.getByTestId('product-link')).toHaveAttribute(
    'href',
    `/products/${MOCK_PRODUCT_WITH_VARIANTS.id.split('/').at(-1)}`
  )
  expect(screen.getByAltText(MOCK_PRODUCT_WITH_VARIANTS.title)).toBeVisible()
  expect(screen.getByAltText(MOCK_PRODUCT_WITH_VARIANTS.title)).toHaveAttribute(
    'src',
    MOCK_PRODUCT_WITH_VARIANTS.featuredImage?.url
  )
  expect(screen.getByTestId('variants-available-text')).toBeVisible()
  expect(screen.getByTestId('variants-available-text')).toHaveTextContent(
    '5 variants available'
  )
  expect(screen.getByText(MOCK_PRODUCT_WITH_VARIANTS.title)).toBeVisible()
  expect(screen.queryByText('Sold out')).not.toBeInTheDocument()
  expect(
    screen.getByText(
      `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(MOCK_PRODUCT_WITH_VARIANTS.priceRange.minVariantPrice.amount))}`
    )
  ).toBeVisible()
})

test('renders product with variants, not on the wishlist page', async () => {
  render(
    <ProductListItem
      product={MOCK_PRODUCT_WITH_VARIANTS}
      isWishlistPage={false}
    />
  )
  expect(
    screen.queryByLabelText(
      `Remove ${MOCK_PRODUCT_WITH_VARIANTS.title} from wishlist`
    )
  ).not.toBeInTheDocument()
  expect(screen.getByTestId('product-link')).toBeVisible()
  expect(screen.getByTestId('product-link')).toHaveAttribute(
    'href',
    `/products/${MOCK_PRODUCT_WITH_VARIANTS.id.split('/').at(-1)}`
  )
  expect(screen.getByAltText(MOCK_PRODUCT_WITH_VARIANTS.title)).toBeVisible()
  expect(screen.getByAltText(MOCK_PRODUCT_WITH_VARIANTS.title)).toHaveAttribute(
    'src',
    MOCK_PRODUCT_WITH_VARIANTS.featuredImage?.url
  )
  expect(screen.getByTestId('variants-available-text')).toBeVisible()
  expect(screen.getByTestId('variants-available-text')).toHaveTextContent(
    '5 variants available'
  )
  expect(screen.getByText(MOCK_PRODUCT_WITH_VARIANTS.title)).toBeVisible()
  expect(screen.queryByText('Sold out')).not.toBeInTheDocument()
  expect(
    screen.getByText(
      `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(MOCK_PRODUCT_WITH_VARIANTS.priceRange.minVariantPrice.amount))}`
    )
  ).toBeVisible()
})

test('renders product without variants on the wishlist page', async () => {
  render(
    <ProductListItem
      product={MOCK_PRODUCT_WITHOUT_VARIANTS}
      isWishlistPage={true}
    />
  )
  expect(
    screen.getByLabelText(
      `Remove ${MOCK_PRODUCT_WITHOUT_VARIANTS.title} from wishlist`
    )
  ).toBeVisible()
  expect(screen.getByTestId('product-link')).toBeVisible()
  expect(screen.getByTestId('product-link')).toHaveAttribute(
    'href',
    `/products/${MOCK_PRODUCT_WITHOUT_VARIANTS.id.split('/').at(-1)}`
  )
  expect(screen.getByAltText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)).toBeVisible()
  expect(
    screen.getByAltText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)
  ).toHaveAttribute('src', MOCK_PRODUCT_WITHOUT_VARIANTS.featuredImage?.url)
  expect(
    screen.queryByTestId('variants-available-text')
  ).not.toBeInTheDocument()
  expect(screen.getByText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)).toBeVisible()
  expect(screen.queryByText('Sold out')).not.toBeInTheDocument()
  expect(
    screen.getByText(
      `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(MOCK_PRODUCT_WITHOUT_VARIANTS.priceRange.minVariantPrice.amount))}`
    )
  ).toBeVisible()
})

test('renders product without variants, not on the wishlist page', async () => {
  render(
    <ProductListItem
      product={MOCK_PRODUCT_WITHOUT_VARIANTS}
      isWishlistPage={false}
    />
  )
  expect(
    screen.queryByLabelText(
      `Remove ${MOCK_PRODUCT_WITHOUT_VARIANTS.title} from wishlist`
    )
  ).not.toBeInTheDocument()
  expect(screen.getByTestId('product-link')).toBeVisible()
  expect(screen.getByTestId('product-link')).toHaveAttribute(
    'href',
    `/products/${MOCK_PRODUCT_WITHOUT_VARIANTS.id.split('/').at(-1)}`
  )
  expect(screen.getByAltText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)).toBeVisible()
  expect(
    screen.getByAltText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)
  ).toHaveAttribute('src', MOCK_PRODUCT_WITHOUT_VARIANTS.featuredImage?.url)
  expect(
    screen.queryByTestId('variants-available-text')
  ).not.toBeInTheDocument()
  expect(screen.getByText(MOCK_PRODUCT_WITHOUT_VARIANTS.title)).toBeVisible()
  expect(screen.queryByText('Sold out')).not.toBeInTheDocument()
  expect(
    screen.getByText(
      `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(MOCK_PRODUCT_WITHOUT_VARIANTS.priceRange.minVariantPrice.amount))}`
    )
  ).toBeVisible()
})

test('renders sold out product on the wishlist page', async () => {
  render(
    <ProductListItem product={MOCK_SOLD_OUT_PRODUCT} isWishlistPage={true} />
  )
  expect(
    screen.getByLabelText(`Remove ${MOCK_SOLD_OUT_PRODUCT.title} from wishlist`)
  ).toBeVisible()
  expect(screen.getByTestId('product-link')).toBeVisible()
  expect(screen.getByTestId('product-link')).toHaveAttribute(
    'href',
    `/products/${MOCK_SOLD_OUT_PRODUCT.id.split('/').at(-1)}`
  )
  expect(screen.getByAltText(MOCK_SOLD_OUT_PRODUCT.title)).toBeVisible()
  expect(screen.getByAltText(MOCK_SOLD_OUT_PRODUCT.title)).toHaveAttribute(
    'src',
    MOCK_SOLD_OUT_PRODUCT.featuredImage?.url
  )
  expect(
    screen.queryByTestId('variants-available-text')
  ).not.toBeInTheDocument()
  expect(screen.getByText(MOCK_SOLD_OUT_PRODUCT.title)).toBeVisible()
  expect(screen.getByText('Sold out')).toBeVisible()
  expect(
    screen.queryByText(
      `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(MOCK_SOLD_OUT_PRODUCT.priceRange.minVariantPrice.amount))}`
    )
  ).not.toBeInTheDocument()
})

test('renders sold out product, not on the wishlist page', async () => {
  render(
    <ProductListItem product={MOCK_SOLD_OUT_PRODUCT} isWishlistPage={false} />
  )
  expect(
    screen.queryByLabelText(
      `Remove ${MOCK_SOLD_OUT_PRODUCT.title} from wishlist`
    )
  ).not.toBeInTheDocument()
  expect(screen.getByTestId('product-link')).toBeVisible()
  expect(screen.getByTestId('product-link')).toHaveAttribute(
    'href',
    `/products/${MOCK_SOLD_OUT_PRODUCT.id.split('/').at(-1)}`
  )
  expect(screen.getByAltText(MOCK_SOLD_OUT_PRODUCT.title)).toBeVisible()
  expect(screen.getByAltText(MOCK_SOLD_OUT_PRODUCT.title)).toHaveAttribute(
    'src',
    MOCK_SOLD_OUT_PRODUCT.featuredImage?.url
  )
  expect(
    screen.queryByTestId('variants-available-text')
  ).not.toBeInTheDocument()
  expect(screen.getByText(MOCK_SOLD_OUT_PRODUCT.title)).toBeVisible()
  expect(screen.getByText('Sold out')).toBeVisible()
  expect(
    screen.queryByText(
      `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(MOCK_SOLD_OUT_PRODUCT.priceRange.minVariantPrice.amount))}`
    )
  ).not.toBeInTheDocument()
})
