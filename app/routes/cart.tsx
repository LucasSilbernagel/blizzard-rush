import getEnv from '~/get-env'
import { Product } from './products.$productId'
import { request } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import Cart from '~/components/Cart/Cart'
import { MetaFunction } from '@remix-run/node'

export type CartProductInfo = {
  products: {
    edges: {
      node: Product
    }[]
  }
}

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Cart' },
    { name: 'description', content: 'Shopping cart for Blizzard Rush' },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function CartPage() {
  const env = getEnv()

  const fetchCartProductInfo = async (): Promise<CartProductInfo> => {
    const storefrontAccessToken = env.STOREFRONT_API_ACCESS_TOKEN
    const shopifyDomain = env.SHOPIFY_DOMAIN

    const endpoint = `https://${shopifyDomain}/api/2024-04/graphql`

    const productsQuery = `
      query getProducts {
        products(first: 250) {
          edges {
            node {
              title
              variants(first: 250) {
                edges {
                  node {
                    title
                    quantityAvailable
                    id
                  }
                }
              }
            }
          }
        }
      }
    `

    const variables = {}

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': String(storefrontAccessToken),
    }

    return request<CartProductInfo>(endpoint, productsQuery, variables, headers)
  }

  const { data, error, refetch } = useQuery<CartProductInfo, Error>({
    queryKey: ['cartProductData'],
    queryFn: fetchCartProductInfo,
  })

  return <Cart error={error} data={data} refetch={refetch} />
}
