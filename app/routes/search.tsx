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
  const [searchParams] = useSearchParams()

  const searchQuery = String(searchParams.get('q'))

  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = useProductPageData(searchQuery)

  return (
    <SearchPage
      products={products}
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
