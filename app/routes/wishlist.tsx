import type { MetaFunction } from '@remix-run/node'
import { useEffect } from 'react'
import WishlistPage from '~/components/WishlistPage/WishlistPage'
import { useProductPageData } from '~/hooks/useProductPageData'
import { useStoreState } from '~/zustand-store'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Wishlist' },
    {
      name: 'description',
      content: 'Wishlist for Blizzard Rush products',
    },
  ]
}

export default function Wishlist() {
  const { wishlistTitles } = useStoreState()

  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
    refetch,
  } = useProductPageData(undefined, wishlistTitles)

  useEffect(() => {
    if (wishlistTitles.length > 0) {
      refetch()
    }
  }, [refetch, wishlistTitles, products])

  return (
    <WishlistPage
      products={wishlistTitles.length > 0 ? products : []}
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
