import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { request, RequestDocument } from 'graphql-request' // Assuming request has a type for the document
import Product from '~/components/Product'
import getEnv from '~/get-env'

export interface IProduct {
  id: string
  title: string
  featuredImage: {
    url: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  variants: {
    edges: { node: { id: string; title: string; quantityAvailable: number } }[]
  }
}

export interface ProductResponse {
  product: IProduct | PromiseLike<IProduct | null> | null
  data: {
    product: IProduct
  }
}

export const getProductData = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const env = getEnv()

    const storefrontAccessToken = env.STOREFRONT_API_ACCESS_TOKEN

    const shopifyDomain = env.SHOPIFY_DOMAIN

    const endpoint = `https://${shopifyDomain}/api/2023-01/graphql`

    const productQuery: RequestDocument = `
      query getProduct($productId: ID!) {
        product(id: $productId) {
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
          variants(first: 10) {
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
    `

    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': String(storefrontAccessToken),
    }

    const response: ProductResponse = await request<ProductResponse>(
      endpoint,
      productQuery,
      { productId },
      headers
    )

    return response.product
  } catch (error) {
    console.error('Error fetching product data:', error)
    return null
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const productId = `gid://shopify/Product/${params.productId}`

  const productData: IProduct | null = await getProductData(String(productId))

  if (!productData) {
    console.log('no product data')
    return null
  }

  return productData
}

export default function ProductPage() {
  const data = useLoaderData<typeof loader>()

  if (!data) {
    return null
  }

  return (
    <div>
      <Product product={data} />
    </div>
  )
}
