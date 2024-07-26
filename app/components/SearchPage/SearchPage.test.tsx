import { render, screen } from '@testing-library/react'
import SearchPage from './SearchPage'

test('renders search page properly', async () => {
  render(
    <SearchPage
      products={[]}
      isLoadingStorefrontData={false}
      error={null}
      hasNextPage={false}
      fetchNextPage={jest.fn()}
      isFetchingNextPage={false}
      sortOption="PRICE_DESC"
      handleSortOptionChange={jest.fn()}
      searchQuery="Wax"
    />
  )
  expect(screen.getAllByRole('heading')[0]).toBeVisible()
  expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
    `Search results for "Wax"`
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
})
