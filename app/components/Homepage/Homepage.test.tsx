import { render, screen } from '@testing-library/react'
import Homepage from './Homepage'
import { MOCK_PRODUCT_DATA } from '~/mocks/MockProductData'

test('renders the homepage correctly', () => {
  render(
    <Homepage
      products={MOCK_PRODUCT_DATA}
      isLoadingStorefrontData={false}
      error={null}
      hasNextPage={false}
      fetchNextPage={jest.fn()}
      isFetchingNextPage={false}
      sortOption="price-desc"
      handleSortOptionChange={jest.fn()}
    />
  )
  expect(screen.getByText('Blizzard Rush')).toBeVisible()
  expect(screen.getByText('Shop snowboards')).toBeVisible()
  expect(
    screen.getByText(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates beatae corrupti quod iusto consequuntur est praesentium dolore repudiandae quae esse dolorum alias, culpa ut harum, commodi repellendus aperiam quos ipsam labore exercitationem. Eveniet, ullam exercitationem.'
    )
  ).toBeVisible()
  expect(screen.getByText('Snowboards')).toBeVisible()
  expect(screen.getByTestId('product-list')).toBeVisible()
})
