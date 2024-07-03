import type { MetaFunction } from '@remix-run/node'
import Homepage from '~/components/Homepage/Homepage'
import { useProductPageData } from '~/hooks/useProductPageData'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Shop Snowboards' },
    { name: 'description', content: 'All about Blizzard Rush' },
  ]
}

export default function Index() {
  const {
    products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = useProductPageData()

  return (
    <Homepage
      products={products}
      isLoading={isLoading}
      error={error}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      sortOption={sortOption}
      handleSortOptionChange={handleSortOptionChange}
    />
  )
}
