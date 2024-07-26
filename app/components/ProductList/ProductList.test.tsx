import { render, screen } from '@testing-library/react'
import ProductList from './ProductList'
import { userEvent } from '@testing-library/user-event'
import { MOCK_PRODUCT_DATA } from '~/mocks/MockProductData'
import { SortOption } from '~/hooks/useProductPageData'

const mockFetchNextPage = jest.fn()

const mockHandleSortOptionChange = jest.fn()

const commonMockProps = {
  fetchNextPage: mockFetchNextPage,
  isFetchingNextPage: false,
  sortOption: 'PRICE_DESC' as SortOption,
  handleSortOptionChange: mockHandleSortOptionChange,
}

// Error state with error message
test('renders error state with error message', async () => {
  render(
    <ProductList
      {...commonMockProps}
      error={{ message: 'This is an example error.', name: '' }}
      isLoadingStorefrontData={false}
      hasNextPage={false}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.getByText('Error')).toBeVisible()
  expect(screen.getByText('This is an example error.')).toBeVisible()
  expect(
    screen.queryByText('An error occurred, please try again later.')
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument()
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.queryByTestId('product-link')).not.toBeInTheDocument()
  expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
})

// Error state without error message
test('renders error state without error message', async () => {
  render(
    <ProductList
      {...commonMockProps}
      error={{ message: '', name: '' }}
      isLoadingStorefrontData={false}
      hasNextPage={false}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.getByText('Error')).toBeVisible()
  expect(
    screen.getByText('An error occurred, please try again later.')
  ).toBeVisible()
  expect(
    screen.queryByText('This is an example error.')
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument()
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.queryByTestId('product-link')).not.toBeInTheDocument()
  expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
})

// Loading state
test('renders product list loading state', async () => {
  render(
    <ProductList
      {...commonMockProps}
      error={null}
      isLoadingStorefrontData={true}
      hasNextPage={false}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.queryByText('Error')).not.toBeInTheDocument()
  expect(
    screen.queryByText('This is an example error.')
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText('An error occurred, please try again later.')
  ).not.toBeInTheDocument()
  expect(screen.getByTestId('products-loading')).toBeVisible()
  expect(screen.getAllByTestId('product-skeleton')).toHaveLength(12)
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.queryByTestId('product-link')).not.toBeInTheDocument()
  expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
})

// Renders more than one product
test('renders more than one product', async () => {
  render(
    <ProductList
      {...commonMockProps}
      products={MOCK_PRODUCT_DATA}
      error={null}
      isLoadingStorefrontData={false}
      hasNextPage={false}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.queryByText('Error')).not.toBeInTheDocument()
  expect(
    screen.queryByText('This is an example error.')
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText('An error occurred, please try again later.')
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument()
  expect(screen.getByRole('combobox')).toBeVisible()
  expect(screen.getByRole('combobox')).toHaveTextContent('Price, high-low')
  await userEvent.click(screen.getByRole('combobox'))
  await userEvent.click(screen.getByRole('option', { name: 'Price, low-high' }))
  expect(mockHandleSortOptionChange).toHaveBeenCalled()
  expect(mockHandleSortOptionChange).toHaveBeenCalledTimes(1)
  expect(screen.getAllByTestId('product-link')).toHaveLength(
    MOCK_PRODUCT_DATA.length - 1
  )
  expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
})

// Renders more than one product with pagination
test('renders more than one product with pagination', async () => {
  render(
    <ProductList
      {...commonMockProps}
      products={MOCK_PRODUCT_DATA}
      error={null}
      isLoadingStorefrontData={false}
      hasNextPage={true}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.queryByText('Error')).not.toBeInTheDocument()
  expect(
    screen.queryByText('This is an example error.')
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText('An error occurred, please try again later.')
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument()
  expect(screen.getByRole('combobox')).toBeVisible()
  expect(screen.getByRole('combobox')).toHaveTextContent('Price, high-low')
  await userEvent.click(screen.getByRole('combobox'))
  await userEvent.click(screen.getByRole('option', { name: 'Price, low-high' }))
  expect(mockHandleSortOptionChange).toHaveBeenCalled()
  expect(mockHandleSortOptionChange).toHaveBeenCalledTimes(2)
  expect(screen.getAllByTestId('product-link')).toHaveLength(
    MOCK_PRODUCT_DATA.length - 1
  )
  expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  expect(screen.getByText('Load more')).toBeVisible()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
  await userEvent.click(screen.getByText('Load more'))
  expect(mockFetchNextPage).toHaveBeenCalled()
  expect(mockFetchNextPage).toHaveBeenCalledTimes(1)
})

// Renders one product
test('renders one product', async () => {
  render(
    <ProductList
      {...commonMockProps}
      products={MOCK_PRODUCT_DATA.slice(0, 1)}
      error={null}
      isLoadingStorefrontData={false}
      hasNextPage={false}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.queryByText('Error')).not.toBeInTheDocument()
  expect(
    screen.queryByText('This is an example error.')
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText('An error occurred, please try again later.')
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument()
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.getAllByTestId('product-link')).toHaveLength(1)
  expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
})

// Renders no products
test('renders no products (empty state)', async () => {
  render(
    <ProductList
      {...commonMockProps}
      error={null}
      isLoadingStorefrontData={false}
      hasNextPage={false}
      products={[]}
    />
  )
  expect(screen.getByTestId('product-list')).toBeVisible()
  expect(screen.queryByText('Error')).not.toBeInTheDocument()
  expect(
    screen.queryByText('This is an example error.')
  ).not.toBeInTheDocument()
  expect(
    screen.queryByText('An error occurred, please try again later.')
  ).not.toBeInTheDocument()
  expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument()
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  expect(screen.queryByTestId('product-link')).not.toBeInTheDocument()
  expect(screen.getByText('No products found')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toHaveAttribute('href', '/')
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
  expect(screen.queryByText('Loading more...')).not.toBeInTheDocument()
})
