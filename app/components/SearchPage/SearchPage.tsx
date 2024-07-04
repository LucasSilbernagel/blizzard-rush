import { IProduct } from '~/routes/products.$productId'
import ProductList from '../ProductList/ProductList'

type SearchPageProps = {
  isLoadingStorefrontData: boolean
  error: Error | null
  products?: IProduct[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (value: string) => void
  searchQuery: string
}

const SearchPage = (props: SearchPageProps) => {
  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
    searchQuery,
  } = props

  return (
    <div>
      <h1 className="mt-6 text-center text-2xl font-bold uppercase">
        Search results for <span>{`"${searchQuery}"`}</span>
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
      />
    </div>
  )
}

export default SearchPage