import { Link } from '@remix-run/react'
import { IProduct } from '~/routes/products.$productId'
import { Skeleton } from '@/components/ui/skeleton'
import hero from '../../images/hero.webp'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import './Homepage.css'

type HomepageProps = {
  isLoading: boolean
  error: Error | null
  products?: IProduct[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (value: string) => void
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

  const selectOptions = [
    { value: 'PRICE_DESC', label: 'Price, high-low' },
    { value: 'PRICE_ASC', label: 'Price, low-high' },
    { value: 'TITLE_ASC', label: 'Alphabetically, A-Z' },
    { value: 'TITLE_DESC', label: 'Alphabetically, Z-A' },
  ]

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
        {products && !isLoading && !error && (
          <>
            <div className="flex justify-end py-6 pl-8 pr-12">
              <div>
                <Select
                  value={sortOption}
                  onValueChange={handleSortOptionChange}
                >
                  <SelectTrigger className="flex gap-2 text-xl font-bold">
                    <SelectValue placeholder="Price, high-low" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer bg-slate-800">
                    {selectOptions.map((option) => {
                      return (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="py-2 pr-2 focus-visible:bg-slate-100 focus-visible:text-slate-950 dark:focus-visible:bg-slate-950 dark:focus-visible:text-slate-50"
                        >
                          {option.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
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
                            className="max-h-[284px] max-w-[284px]"
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
          </>
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
