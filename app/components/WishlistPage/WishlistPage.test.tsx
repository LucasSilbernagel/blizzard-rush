import { render, screen } from '@testing-library/react'
import WishlistPage from './WishlistPage'

test('renders wishlist page properly', async () => {
  render(
    <WishlistPage
      products={[]}
      isLoadingStorefrontData={false}
      error={null}
      hasNextPage={false}
      fetchNextPage={jest.fn()}
      isFetchingNextPage={false}
      sortOption="PRICE_DESC"
      handleSortOptionChange={jest.fn()}
    />
  )
  expect(screen.getAllByRole('heading')[0]).toBeVisible()
  expect(screen.getAllByRole('heading')[0]).toHaveTextContent(`Wishlist`)
  expect(screen.getByTestId('product-list')).toBeVisible()
})
