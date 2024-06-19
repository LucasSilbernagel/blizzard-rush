import { Link } from '@remix-run/react'
import { IProduct } from '~/routes/products.$productId'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'rc-image'

import './Homepage.css'

type HomepageProps = {
  isLoading: boolean
  error: Error | null
  products?: IProduct[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
}

const Homepage = (props: HomepageProps) => {
  const {
    products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = props

  return (
    <div>
      <h1 className="mb-12">Blizzard Rush</h1>
      {error && <div>Error: {error.message}</div>}
      {isLoading && (
        <ul className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {new Array(12).fill(0).map((_skeleton, index) => {
            return (
              <li key={`skeleton-${index}`}>
                <Skeleton className="h-[364px] w-[300px] sm:w-[345.75px]" />
              </li>
            )
          })}
        </ul>
      )}
      {products && !isLoading && !error && (
        <ul className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products
            .filter((product) => product.featuredImage)
            .map((product) => {
              return (
                <li key={product.id}>
                  <Link
                    to={`/products/${product.id.split('/').at(-1)}`}
                    className="Homepage__product-link"
                  >
                    <div className="Homepage__product-image">
                      <Image
                        placeholder
                        src={product.featuredImage.url}
                        alt={product.title}
                        className="max-h-[329.75px]"
                      />
                    </div>
                    <div className="Homepage__product-footer">
                      <div>
                        <span className="text-base font-bold">
                          {product.title}
                        </span>
                      </div>
                      <div>
                        <span>{`$${product.priceRange.minVariantPrice.amount}`}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
        </ul>
      )}
      {hasNextPage && (
        <div className="my-12 flex w-full justify-center">
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Homepage
