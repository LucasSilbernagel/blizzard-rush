import type { MetaFunction } from '@remix-run/node'
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import getEnv from '~/get-env'
import { IProduct } from './products.$productId'
import Homepage from '~/components/Homepage/Homepage'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Shop Snowboards' },
    { name: 'description', content: 'All about Blizzard Rush' },
  ]
}

type HomepageData = {
  products: {
    edges: {
      node: IProduct
    }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

export default function Index() {
  const env = getEnv()

  const fetchHomepageData = async ({
    pageParam = null,
    sortKey = 'TITLE',
    reverse = false,
  }: {
    pageParam?: string | null
    sortKey?: 'TITLE' | 'PRICE'
    reverse?: boolean
  }): Promise<HomepageData> => {
    const storefrontAccessToken = env.STOREFRONT_API_ACCESS_TOKEN
    const shopifyDomain = env.SHOPIFY_DOMAIN

    const endpoint = `https://${shopifyDomain}/api/2023-01/graphql`

    const productsQuery = `
    query getProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
        edges {
          cursor
          node {
            id
            title
            featuredImage {
              url
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `

    const variables = {
      first: 5,
      after: pageParam,
      sortKey,
      reverse,
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': String(storefrontAccessToken),
    }

    return request<HomepageData>(endpoint, productsQuery, variables, headers)
  }

  const [sortKey, setSortKey] = useState<'TITLE' | 'PRICE'>('TITLE')
  const [reverse, setReverse] = useState<boolean>(false)

  const fetchHomepageDataWrapper = async (
    context: QueryFunctionContext
  ): Promise<HomepageData> => {
    const pageParam = context.pageParam as string | null
    return fetchHomepageData({ pageParam, sortKey, reverse })
  }

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<HomepageData, Error>({
    queryKey: ['storefrontData', sortKey, reverse],
    queryFn: fetchHomepageDataWrapper,
    getNextPageParam: (lastPage) =>
      lastPage.products.pageInfo.hasNextPage
        ? lastPage.products.pageInfo.endCursor
        : undefined,
    initialPageParam: null,
  })

  const products =
    data?.pages.flatMap((page) =>
      page.products.edges.map((edge) => edge.node)
    ) || []

  return (
    <Homepage
      products={products}
      isLoading={isLoading}
      error={error}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      sortKey={sortKey}
      reverse={reverse}
      setSortKey={setSortKey}
      setReverse={setReverse}
    />
  )
}
