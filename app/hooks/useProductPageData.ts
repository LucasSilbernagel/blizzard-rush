import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import { useState } from 'react'
import getEnv from '~/get-env'
import { IProduct } from '~/routes/products.$productId'

type ProductPageData = {
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

export const useProductPageData = () => {
  const env = getEnv()

  const fetchProductPageData = async ({
    pageParam = null,
    sortKey = 'TITLE',
    reverse = false,
  }: {
    pageParam?: string | null
    sortKey?: 'TITLE' | 'PRICE'
    reverse?: boolean
  }): Promise<ProductPageData> => {
    const storefrontAccessToken = env.STOREFRONT_API_ACCESS_TOKEN
    const shopifyDomain = env.SHOPIFY_DOMAIN

    const endpoint = `https://${shopifyDomain}/api/2024-04/graphql`

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
            variants(first: 250) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                }
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
      first: 36,
      after: pageParam,
      sortKey,
      reverse,
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': String(storefrontAccessToken),
    }

    return request<ProductPageData>(endpoint, productsQuery, variables, headers)
  }

  const [sortOption, setSortOption] = useState<string>('PRICE_DESC')

  const sortKey = sortOption.includes('TITLE') ? 'TITLE' : 'PRICE'
  const reverse = sortOption.includes('DESC')

  const fetchProductPageDataWrapper = async (
    context: QueryFunctionContext
  ): Promise<ProductPageData> => {
    const pageParam = context.pageParam as string | null
    return fetchProductPageData({ pageParam, sortKey, reverse })
  }

  const {
    data,
    error,
    isLoading: isLoadingStorefrontData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<ProductPageData, Error>({
    queryKey: ['storefrontData', sortKey, reverse],
    queryFn: fetchProductPageDataWrapper,
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

  const handleSortOptionChange = (value: string) => {
    setSortOption(value)
    refetch()
  }

  return {
    products,
    isLoadingStorefrontData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    sortOption,
    handleSortOptionChange,
  }
}
