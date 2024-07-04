import { Link } from '@remix-run/react'
import { IProduct } from '~/routes/products.$productId'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import './ProductList.css'
import { Loader2 } from 'lucide-react'
import { FaArrowDown } from 'react-icons/fa6'

type ProductListProps = {
  isLoadingStorefrontData: boolean
  error: Error | null
  products?: IProduct[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (value: string) => void
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
  } = props

  const selectOptions = [
    { value: 'PRICE_DESC', label: 'Price, high-low' },
    { value: 'PRICE_ASC', label: 'Price, low-high' },
    { value: 'TITLE_ASC', label: 'Alphabetically, A-Z' },
    { value: 'TITLE_DESC', label: 'Alphabetically, Z-A' },
  ]

  return (
    <>
      {error && !isLoadingStorefrontData && (
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
            <ul className="mx-auto flex max-w-max flex-col items-center gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products
                .filter((product) => product.featuredImage)
                .map((product) => {
                  const isSoldOut =
                    product.variants.edges.every(
                      (product) => product.node.quantityAvailable === 0
                    ) && product.title !== 'Gift Card'
                  const variantsAvailable = product.variants.edges.length
                  return (
                    <li key={product.id} className="flex justify-center">
                      <Link
                        to={`/products/${product.id.split('/').at(-1)}`}
                        className="ProductList__product-link"
                      >
                        <div className="ProductList__product-image">
                          <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="max-h-[284px] max-w-[284px]"
                          />
                        </div>
                        <div className="ProductList__product-footer">
                          {variantsAvailable > 1 && (
                            <div>
                              <span className="text-sm">
                                {`${variantsAvailable} variants available`}
                              </span>
                            </div>
                          )}
                          <div>
                            <span className="text-base font-bold">
                              {product.title}
                            </span>
                          </div>
                          <div>
                            <span>
                              {isSoldOut ? (
                                <span className="bg-slate-950 p-0.5 font-bold uppercase text-white">
                                  Sold out
                                </span>
                              ) : (
                                `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.priceRange.minVariantPrice.amount))}`
                              )}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
            </ul>
          )}
        {products &&
          products.length === 0 &&
          !isLoadingStorefrontData &&
          !error && (
            <div className="mx-auto my-44 max-w-screen-sm text-center">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>No products found.</AlertDescription>
              </Alert>
            </div>
          )}
        {hasNextPage && (
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
    </>
  )
}

export default ProductList
