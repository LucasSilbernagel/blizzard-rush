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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(subtotal)
  }

  if (
    (isLoading || loading) &&
    !error &&
    (!checkout.lineItems || checkout.lineItems?.length < 1)
  ) {
    return (
      <div className="flex flex-col gap-2 px-4 pt-16 md:px-16">
        <Skeleton className="h-[130px] w-full" />
        <Skeleton className="h-[130px] w-full" />
        <Skeleton className="h-[130px] w-full" />
        <Skeleton className="h-[130px] w-full" />
      </div>
    )
  } else if (
    error &&
    !isLoading &&
    !loading &&
    (!checkout.lineItems || checkout.lineItems?.length < 1)
  ) {
    return (
      <div className="mx-auto my-44 max-w-screen-sm text-center">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || 'An error occurred, please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    )
  } else if (
    !isLoading &&
    !loading &&
    !error &&
    (!checkout.lineItems || checkout.lineItems?.length < 1)
  ) {
    return (
      <div className="pt-16">
        <h1 className="my-6 pt-16 text-center font-anton text-3xl font-bold uppercase tracking-wide xl:pt-0">
          Your cart is empty
        </h1>
        <div className="mx-auto my-16 max-w-max">
          <Link
            to="/"
            className="ContrastLink flex items-center gap-2 font-bold"
          >
            <FaArrowLeft /> Continue shopping
          </Link>
        </div>
      </div>
    )
  } else if (
    checkout.lineItems?.length > 0 &&
    !error &&
    !isLoading &&
    !loading
  ) {
    return (
      <div className="relative">
        <div className="absolute left-16 top-2">
          <Link
            to="/"
            className="ContrastLink flex items-center gap-2 font-bold"
          >
            <FaArrowLeft /> Continue shopping
          </Link>
        </div>
        <h1 className="my-6 pt-16 text-center font-anton text-3xl font-bold uppercase tracking-wide xl:pt-0">
          Shopping cart
        </h1>
        <div className="mx-auto flex max-w-max flex-col gap-8 px-4 xl:flex-row xl:px-0">
          <div
            role="table"
            className="overflow-x-auto border border-x-transparent border-b-transparent border-t-gray-300"
          >
            <div role="row" className="sr-only">
              <div role="columnheader">Cart item image</div>
              <div role="columnheader">Cart item name</div>
              <div role="columnheader">Cart item quantity</div>
              <div role="columnheader">Remove cart item</div>
              <div role="columnheader">Cart item subtotal</div>
            </div>
            {checkout.lineItems?.map((lineItem) => {
              const maximumQuantityAvailable = data?.products.edges
                .find((edge) => edge.node.title === lineItem.title)
                ?.node.variants.edges.find(
                  (edge) => edge.node.id === lineItem.variant?.id
                )?.node.quantityAvailable

              const getItemSubtotal = () => {
                const subtotal =
                  Number(lineItem.variant?.price.amount) * lineItem.quantity
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(subtotal)
              }

              return (
                <div key={lineItem.id} role="row" className="flex">
                  <div className="flex items-center border border-x-transparent border-b-gray-300 border-t-transparent py-4">
                    <div className="flex items-center">
                      <div className="mr-4" role="cell">
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
                      <div className="w-72" role="cell">
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
                      <div className="w-16" role="cell">
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
                            {getQuantitySelectOptions(
                              maximumQuantityAvailable
                            ).map((quantity) => {
                              return (
                                <SelectItem
                                  key={quantity.label}
                                  value={quantity.value}
                                >
                                  {quantity.label}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div role="cell">
                        <Button
                          disabled={loading}
                          onClick={() => handleRemoveLineItem(lineItem)}
                          variant="ghost"
                          className="flex items-center gap-2 font-bold"
                        >
                          <FaTrash /> Remove
                        </Button>
                      </div>
                      <div role="cell">
                        <span className="text-xl font-bold">
                          {getItemSubtotal()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mx-auto w-[280px] sm:w-[368px]">
            <div className="flex justify-between bg-black p-4 text-xl font-bold text-white">
              <div>
                <span>Subtotal</span>
              </div>
              <div>
                <span>{calculateCartSubtotal(checkout.lineItems)}</span>
              </div>
            </div>
            <div className="bg-gray-100 p-4">
              <div>
                <a
                  target="_blank"
                  href={checkout.webUrl}
                  rel="noreferrer"
                  className="BrightnessLink block w-full bg-theme-yellow py-2 text-center text-2xl font-bold"
                >
                  Check Out
                </a>
              </div>
              <div className="mt-4 flex justify-center">
                <span className="text-center text-xs italic">
                  Shipping & taxes calculated at checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
