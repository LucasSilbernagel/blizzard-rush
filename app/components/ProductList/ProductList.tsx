import { Link } from '@remix-run/react'
import { Product } from '~/routes/products.$productId'
import { Skeleton } from 'shadcn/components/ui/skeleton'
import { Button } from 'shadcn/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from 'shadcn/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shadcn/components/ui/select'
import { Loader2 } from 'lucide-react'
import { FaArrowDown, FaArrowLeft } from 'react-icons/fa6'
import './ProductList.css'
import ProductListItem from './ProductListItem/ProductListItem'

type ProductListProps = {
  isLoadingStorefrontData: boolean
  error: Error | null
  products?: Product[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (value: string) => void
  isWishlistPage?: boolean
}

const ProductList = (props: ProductListProps) => {
  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
    isWishlistPage = false,
  } = props

  const selectOptions = [
    { value: 'PRICE_DESC', label: 'Price, high-low' },
    { value: 'PRICE_ASC', label: 'Price, low-high' },
    { value: 'TITLE_ASC', label: 'Alphabetically, A-Z' },
    { value: 'TITLE_DESC', label: 'Alphabetically, Z-A' },
  ]

  return (
    <div data-testid="product-list">
      {error && !isLoadingStorefrontData && (
        // Error state
        <div className="mx-auto my-44 max-w-screen-sm text-center">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || 'An error occurred, please try again later.'}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {isLoadingStorefrontData && (
        // Loading state
        <ul className="mx-auto mt-24 flex max-w-max flex-col items-center gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {new Array(12).fill(0).map((_skeleton, index) => {
            return (
              <li key={`skeleton-${index}`}>
                <Skeleton className="h-[364px] w-[300px]" />
              </li>
            )
          })}
        </ul>
      )}
      <div className="mx-auto max-w-screen-2xl">
        {products &&
          products.length > 1 &&
          !isLoadingStorefrontData &&
          !error && (
            // Product sort dropdown
            <div className="flex justify-end py-6 pl-8 pr-12">
              <div>
                <Select
                  value={sortOption}
                  onValueChange={handleSortOptionChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Price, high-low" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectOptions.map((option) => {
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        {products &&
          products.length > 0 &&
          !isLoadingStorefrontData &&
          !error && (
            // Products render successfully
            <ul className="mx-auto flex max-w-max flex-col items-center gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products
                .filter((product) => product.featuredImage)
                .map((product) => {
                  return (
                    <ProductListItem
                      key={product.id}
                      product={product}
                      isWishlistPage={isWishlistPage}
                    />
                  )
                })}
            </ul>
          )}
        {products &&
          products.length === 0 &&
          !isLoadingStorefrontData &&
          !error && (
            // Empty state
            <div className="my-44">
              <h2 className="my-6 pt-16 text-center font-anton text-3xl font-bold uppercase tracking-wide xl:pt-0">
                No products found
              </h2>
              <div className="mx-auto my-16 max-w-max">
                <Link
                  to="/"
                  className="ContrastLink flex items-center gap-2 font-bold"
                >
                  <FaArrowLeft /> Continue shopping
                </Link>
              </div>
            </div>
          )}
        {hasNextPage && (
          // Load more button
          <div className="my-12 flex w-full justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FaArrowDown className="mr-2 h-4 w-4" />
              )}
              {isFetchingNextPage ? 'Loading more...' : 'Load more'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
