import Homepage from '~/components/Homepage/Homepage'
import { useProductPageData } from '~/hooks/useProductPageData'

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

  return (
    <Homepage
      products={products}
      isLoadingStorefrontData={isLoadingStorefrontData}
      error={error}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      sortOption={sortOption}
      handleSortOptionChange={handleSortOptionChange}
    />
  )
}
