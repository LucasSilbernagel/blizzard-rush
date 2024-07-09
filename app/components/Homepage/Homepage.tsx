import { Product } from '~/routes/products.$productId'
import hero from '../../images/hero.webp'
import ProductList from '../ProductList/ProductList'

type HomepageProps = {
  isLoadingStorefrontData: boolean
  error: Error | null
  products?: Product[]
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetchingNextPage: boolean
  sortOption: string
  handleSortOptionChange: (value: string) => void
}

const Homepage = (props: HomepageProps) => {
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
          <h2 className="absolute -bottom-2 left-2 font-anton text-8xl uppercase text-white">
            Snowboards
          </h2>
        </div>
      </div>
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

export default Homepage
