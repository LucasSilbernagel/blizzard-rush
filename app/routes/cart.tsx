import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Link } from '@remix-run/react'
import { FaArrowLeft, FaTrash } from 'react-icons/fa6'
import getEnv from '~/get-env'
import { useStoreState } from '~/zustand-store'
import { IProduct } from './products.$productId'
import { request } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { CheckoutLineItem } from 'shopify-buy'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { PiCaretUpDownBold } from 'react-icons/pi'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type CartProductInfo = {
  products: {
    edges: {
      node: IProduct
    }[]
  }
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

  const { checkout, updateLineItem, removeLineItem, loading } = useStoreState()

  const { data, error, isLoading, refetch } = useQuery<CartProductInfo, Error>({
    queryKey: ['cartProductData'],
    queryFn: fetchCartProductInfo,
  })

  const handleQuantityChange = (value: string, lineItem: CheckoutLineItem) => {
    updateLineItem(checkout.id, lineItem.id, value)
    toast({
      title: 'Updated cart',
    })
    refetch()
  }

  const handleRemoveLineItem = (lineItem: CheckoutLineItem) => {
    removeLineItem(checkout.id, lineItem.id)
    toast({
      title: 'Updated cart',
    })
    refetch()
  }

  const getQuantitySelectOptions = (maximum: number | undefined) => {
    if (maximum && maximum < 9) {
      return Array.from({ length: maximum }, (_, i) => i + 1).map(
        (quantity) => {
          return { label: String(quantity), value: String(quantity) }
        }
      )
    } else {
      return Array.from({ length: 9 }, (_, i) => i + 1).map((quantity) => {
        return { label: String(quantity), value: String(quantity) }
      })
    }
  }

  const calculateCartSubtotal = (lineItems: CheckoutLineItem[]) => {
    let subtotal = 0
    lineItems?.forEach((lineItem) => {
      subtotal += Number(lineItem.variant?.price.amount) * lineItem.quantity
    })
    return subtotal.toFixed(2)
  }

  return (
    <div className="relative">
      <div className="absolute left-16 top-2">
        <Link to="/" className="ContrastLink flex items-center gap-2 font-bold">
          <FaArrowLeft /> Continue shopping
        </Link>
      </div>
      <h1 className="my-6 text-center font-anton text-3xl font-bold uppercase tracking-wide">
        Shopping cart
      </h1>
      <div className="mx-auto flex max-w-max">
        <ul className="border border-x-transparent border-b-transparent border-t-gray-300">
          {checkout.lineItems?.map((lineItem) => {
            const maximumQuantityAvailable = data?.products.edges
              .find((edge) => edge.node.title === lineItem.title)
              ?.node.variants.edges.find(
                (edge) => edge.node.id === lineItem.variant?.id
              )?.node.quantityAvailable

            const getItemSubtotal = () => {
              const subtotal =
                Number(lineItem.variant?.price.amount) * lineItem.quantity
              return subtotal.toFixed(2)
            }

            return (
              <li
                key={lineItem.id}
                className="flex items-center border border-x-transparent border-b-gray-300 border-t-transparent py-4"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <Link
                      to={`/products/${lineItem.variant?.product.id.split('/').at(-1)}`}
                    >
                      <img
                        src={lineItem.variant?.image.src}
                        alt=""
                        className="w-24"
                      />
                    </Link>
                  </div>
                  <div className="w-72">
                    <Link
                      to={`/products/${lineItem.variant?.product.id.split('/').at(-1)}`}
                    >
                      <div>
                        <Tooltip>
                          <TooltipTrigger>
                            <h2 className="mr-4 max-w-60 overflow-hidden text-ellipsis text-nowrap text-lg font-bold">
                              {lineItem.title}
                            </h2>
                          </TooltipTrigger>
                          <TooltipContent>
                            <h2>{lineItem.title}</h2>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </Link>
                    {lineItem.variant?.title &&
                      lineItem.variant.title !== 'Default Title' && (
                        <div>
                          <Tooltip>
                            <TooltipTrigger>
                              <h2 className="max-w-60 overflow-hidden text-ellipsis text-nowrap">
                                {lineItem.variant.title}
                              </h2>
                            </TooltipTrigger>
                            <TooltipContent>
                              <h2>{lineItem.variant.title}</h2>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16">
                    <Select
                      disabled={loading}
                      value={String(lineItem.quantity)}
                      onValueChange={(value) =>
                        handleQuantityChange(value, lineItem)
                      }
                    >
                      <SelectTrigger icon={<PiCaretUpDownBold />}>
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        {getQuantitySelectOptions(maximumQuantityAvailable).map(
                          (quantity) => {
                            return (
                              <SelectItem
                                key={quantity.label}
                                value={quantity.value}
                              >
                                {quantity.label}
                              </SelectItem>
                            )
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button
                      disabled={loading}
                      onClick={() => handleRemoveLineItem(lineItem)}
                      variant="ghost"
                      className="flex items-center gap-2 font-bold"
                    >
                      <FaTrash /> Remove
                    </Button>
                  </div>
                  <div>
                    <span className="text-xl font-bold">
                      ${getItemSubtotal()}
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div>
          <div className="flex justify-between">
            <div>
              <span>Subtotal</span>
            </div>
            <div>
              <span>${calculateCartSubtotal(checkout.lineItems)}</span>
            </div>
          </div>
        </div>
      </div>
      <a
        target="_blank"
        href={checkout.webUrl}
        rel="noreferrer"
        className="mt-2 inline-block rounded bg-black p-2 text-white"
      >
        Complete checkout
      </a>
    </div>
  )
}
