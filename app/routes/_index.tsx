import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useQuery } from '@tanstack/react-query'
import { request } from 'graphql-request'
import getEnv from '~/get-env'
import { IProduct } from './products.$productId'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush' },
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Blizzard Rush</h1>
      {products && (
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id.split('/').at(-1)}`}>
                  {product.title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
