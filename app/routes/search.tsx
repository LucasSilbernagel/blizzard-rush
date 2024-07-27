import type { MetaFunction } from '@remix-run/node'
import { useSearchParams } from '@remix-run/react'
import { useEffect } from 'react'
import SearchPage from '~/components/SearchPage/SearchPage'
import getEnv from '~/get-env'
import { useProductPageData } from '~/hooks/useProductPageData'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Search' },
    {
      name: 'description',
      content: 'Search results for Blizzard Rush products',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function Search() {
  const [searchParams] = useSearchParams()

  const searchQuery = String(searchParams.get('q'))

  const {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
    refetch,
  } = useProductPageData(searchQuery)

  useEffect(() => {
    if (searchQuery.length >= 3) {
      refetch()
    }
  }, [searchQuery, refetch])

  return (
    <SearchPage
      products={products}
      isLoadingStorefrontData={isLoadingStorefrontData}
      error={error}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      sortOption={sortOption}
      handleSortOptionChange={handleSortOptionChange}
      searchQuery={searchQuery}
    />
  )
}
