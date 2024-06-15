import type { MetaFunction } from '@remix-run/node'
import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import getEnv from '~/get-env'
import { IProduct } from './products.$productId'
import Homepage from '~/components/Homepage/Homepage'

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
  }
}

export default function Index() {
  const env = getEnv()

  const fetchHomepageData = async (): Promise<HomepageData> => {
    const storefrontAccessToken = env.STOREFRONT_API_ACCESS_TOKEN
    const shopifyDomain = env.SHOPIFY_DOMAIN

    const endpoint = `https://${shopifyDomain}/api/2023-01/graphql`

    const productsQuery = `
      query getProducts {
        products(first: 250) {
          edges {
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
        }
      }
    `

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': String(storefrontAccessToken),
    }

    return request<HomepageData>(endpoint, productsQuery, {}, headers)
  }

  const { data, error, isLoading } = useQuery<HomepageData>({
    queryKey: ['storefrontData'],
    queryFn: fetchHomepageData,
  })

  const products = data?.products.edges.map((edge) => edge.node)

  return <Homepage products={products} isLoading={isLoading} error={error} />
}
