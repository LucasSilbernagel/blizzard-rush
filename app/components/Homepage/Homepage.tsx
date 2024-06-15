import { Link } from '@remix-run/react'
import { IProduct } from '~/routes/products.$productId'
import { Skeleton } from '@/components/ui/skeleton'

import './Homepage.css'

type HomepageProps = {
  isLoading: boolean
  error: Error | null
  products?: IProduct[]
}

const Homepage = (props: HomepageProps) => {
  const { products, isLoading, error } = props

  return (
    <div>
      <h1 className="mb-12">Blizzard Rush</h1>
      {error && <div>Error: {error.message}</div>}
      {isLoading && (
        <ul className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {new Array(12).fill(0).map((_skeleton, index) => {
            return (
              <li key={`skeleton-${index}`}>
                <Skeleton className="h-[364px] w-[345.75px]" />
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
                      <img
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
    </div>
  )
}

export default Homepage
