import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import IndividualProduct from './IndividualProduct'
import { MOCK_PRODUCT_WITH_VARIANTS } from '~/mocks/MockIndividualProducts'

test('renders a product with variants correctly', async () => {
  render(<IndividualProduct product={MOCK_PRODUCT_WITH_VARIANTS} />)
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
  // expect(
  //   screen.getByText(`Added ${MOCK_PRODUCT_WITH_VARIANTS.title} to cart`)
  // ).toBeVisible()
  // expect(screen.getByText('Add to wishlist')).toBeVisible()
})
