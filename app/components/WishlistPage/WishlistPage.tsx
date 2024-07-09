import { Product } from '~/routes/products.$productId'
import ProductList from '../ProductList/ProductList'

type WishlistPageProps = {
  isLoadingStorefrontData: boolean
  error: Error | null
  products?: Product[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (value: string) => void
}

const WishlistPage = (props: WishlistPageProps) => {
  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = props

  return (
    <div>
      <h1 className="mt-6 text-center text-2xl font-bold uppercase">
        Wishlist
      </h1>
      <ProductList
        products={products}
        isLoadingStorefrontData={isLoadingStorefrontData}
        error={error}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        sortOption={sortOption}
        handleSortOptionChange={handleSortOptionChange}
        isWishlistPage={true}
      />
    </div>
  )
}

export default WishlistPage
