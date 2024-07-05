import type { MetaFunction } from '@remix-run/node'
import WishlistPage from '~/components/WishlistPage/WishlistPage'
import { useProductPageData } from '~/hooks/useProductPageData'

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
  let savedWishlistTitles
  let wishlistTitles: string[] = []

  if (typeof window !== 'undefined') {
    savedWishlistTitles = localStorage.getItem('wishlistTitles')
    wishlistTitles = JSON.parse(savedWishlistTitles || '[]')
  }

  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = useProductPageData(undefined, wishlistTitles)

  return (
    <WishlistPage
      products={wishlistTitles.length ? products : []}
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
