import { Link } from '@remix-run/react'
import { IProduct } from '~/routes/products.$productId'
import { Skeleton } from '@/components/ui/skeleton'
import hero from '../../images/hero.webp'
import './Homepage.css'

type HomepageProps = {
  isLoading: boolean
  error: Error | null
  products?: IProduct[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Homepage = (props: HomepageProps) => {
  const {
    products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = props

  return (
    <div>
      <h1 className="sr-only">Blizzard Rush</h1>
      <div className="flex gap-6">
        <div className="w-full bg-[#262626] px-4 pb-4 pt-4 text-white md:px-36 xl:w-3/12 xl:px-10 xl:pb-14 xl:pt-32">
          <h2 className="mb-1 text-center text-sm font-bold uppercase">
            Shop snowboards
          </h2>
          <p className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            beatae corrupti quod iusto consequuntur est praesentium dolore
            repudiandae quae esse dolorum alias, culpa ut harum, commodi
            repellendus aperiam quos ipsam labore exercitationem. Eveniet, ullam
            exercitationem.
          </p>
        </div>
        <div
          style={{
            backgroundImage: `url(${hero})`,
          }}
          className="relative hidden w-9/12 bg-cover bg-center bg-no-repeat xl:block"
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <h2 className="font-anton absolute -bottom-2 left-2 text-8xl uppercase text-white">
            Snowboards
          </h2>
        </div>
      </div>
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
      <div className="mx-auto max-w-screen-2xl">
        <div>
          <label>
            <span className="sr-only">Sort:</span>
            <select value={sortOption} onChange={handleSortOptionChange}>
              <option value="TITLE_ASC">Alphabetically, A-Z</option>
              <option value="TITLE_DESC">Alphabetically, Z-A</option>
              <option value="PRICE_ASC">Price, low-high</option>
              <option value="PRICE_DESC">Price, high-low</option>
            </select>
          </label>
        </div>
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
        {hasNextPage && (
          <div className="my-12 flex w-full justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
