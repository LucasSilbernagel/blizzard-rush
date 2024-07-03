import type { MetaFunction } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import SearchPage from '~/components/SearchPage/SearchPage'
import { useProductPageData } from '~/hooks/useProductPageData'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Search' },
    {
      name: 'description',
      content: 'Search results for Blizzard Rush products',
    },
  ]
}

export default function Index() {
  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = useProductPageData()

  const [searchParams] = useSearchParams()

  const searchQuery = String(searchParams.get('q'))

  const filteredProducts = products.filter((product) =>
    JSON.stringify(product).toLowerCase().includes(searchQuery)
  )

  return (
    <SearchPage
      products={filteredProducts}
      isLoadingStorefrontData={isLoadingStorefrontData}
      error={error}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      sortOption={sortOption}
      handleSortOptionChange={handleSortOptionChange}
      searchQuery={searchQuery}
    />
  )
}
