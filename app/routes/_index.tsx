import { MetaFunction } from '@remix-run/node'
import Homepage from '~/components/Homepage/Homepage'
import getEnv from '~/get-env'
import { useProductPageData } from '~/hooks/useProductPageData'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Shop Snowboards' },
    { name: 'description', content: 'Shop snowboards from Blizzard Rush' },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function Index() {
  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  } = useProductPageData()

  return (
    <Homepage
      products={products}
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
