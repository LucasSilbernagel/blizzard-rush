import { Link } from '@remix-run/react'
import { FaArrowLeft, FaTrash } from 'react-icons/fa6'
import { PiCaretUpDownBold } from 'react-icons/pi'
import { Button } from 'shadcn/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shadcn/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'shadcn/components/ui/tooltip'
import { toast } from 'shadcn/components/ui/use-toast'
import { CartProductInfo } from '~/routes/cart'
import {
  calculateCartSubtotal,
  CheckoutLineItem,
  getItemSubtotal,
} from '~/utils/priceFormatting'
import { useStoreState } from '~/zustand-store'

const FullCart = ({
  data,
  refetch,
}: {
  data?: CartProductInfo
  refetch: () => void
}) => {
  const { cart, updateLineItem, removeLineItem, isLoadingShopifyCart } =
    useStoreState()

  const handleQuantityChange = (value: string, lineItem: CheckoutLineItem) => {
    updateLineItem(cart.id, lineItem.id, value)
    toast({
      title: 'Updated cart',
    })
    refetch()
  }

  const handleRemoveLineItem = (lineItem: CheckoutLineItem) => {
    removeLineItem(cart.id, lineItem.id)
    toast({
      title: 'Updated cart',
    })
    refetch()
  }

  console.log(cart)

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

  return (
    <div className="relative">
      <div className="absolute left-16 top-2">
        <Link to="/" className="ContrastLink flex items-center gap-2 font-bold">
          <FaArrowLeft /> Continue shopping
        </Link>
      </div>
      <h1 className="my-6 pt-16 text-center font-anton text-3xl uppercase tracking-wide xl:pt-0">
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
          {cart.lines.edges.map((lineItem) => {
            const maximumQuantityAvailable = data?.products.edges
              .find(
                (edge) =>
                  edge.node.title === lineItem.node.merchandise.product.title
              )
              ?.node.variants.edges.find(
                (edge) => edge.node.id === lineItem.node.merchandise.id
              )?.node.quantityAvailable

            return (
              <div
                key={lineItem.node.id}
                role="row"
                className="flex"
                data-testid={`cart-item-${lineItem.node.id}`}
              >
                <div className="flex items-center border border-x-transparent border-b-gray-300 border-t-transparent py-4">
                  <div className="flex items-center">
                    <div className="mr-4" role="cell">
                      <Link
                        to={`/products/${lineItem.node.merchandise?.product.id.split('/').at(-1)}`}
                        data-testid="cart-item-image-link"
                      >
                        <img
                          src={lineItem.node.merchandise.image.src}
                          alt={lineItem.node.merchandise.product.title}
                          className="w-24"
                        />
                      </Link>
                    </div>
                    <div className="w-72" role="cell">
                      <Link
                        to={`/products/${lineItem.node.merchandise?.product.id.split('/').at(-1)}`}
                        data-testid="cart-item-title-link"
                      >
                        <div>
                          <Tooltip>
                            <TooltipTrigger>
                              <h2 className="mr-4 max-w-60 overflow-hidden text-ellipsis text-nowrap text-lg font-bold">
                                {lineItem.node.merchandise.product.title}
                              </h2>
                            </TooltipTrigger>
                            <TooltipContent>
                              <h2>{lineItem.node.merchandise.product.title}</h2>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </Link>
                      {lineItem.node.merchandise?.product.title &&
                        lineItem.node.merchandise.product.title !==
                          'Default Title' && (
                          <div>
                            <Tooltip>
                              <TooltipTrigger>
                                <h2 className="max-w-60 overflow-hidden text-ellipsis text-nowrap">
                                  {lineItem.node.merchandise.product.title}
                                </h2>
                              </TooltipTrigger>
                              <TooltipContent>
                                <h2>
                                  {lineItem.node.merchandise.product.title}
                                </h2>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16" role="cell">
                      <Select
                        disabled={isLoadingShopifyCart}
                        value={String(lineItem.node.quantity)}
                        onValueChange={(value) =>
                          handleQuantityChange(value, lineItem.node)
                        }
                      >
                        <SelectTrigger
                          aria-label={String(lineItem.node.quantity)}
                          icon={<PiCaretUpDownBold />}
                        >
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
                        disabled={isLoadingShopifyCart}
                        onClick={() => handleRemoveLineItem(lineItem.node)}
                        variant="ghost"
                        className="flex items-center gap-2 font-bold"
                      >
                        <FaTrash /> Remove
                      </Button>
                    </div>
                    <div role="cell">
                      <span
                        className="text-xl font-bold"
                        data-testid="item-subtotal"
                      >
                        {getItemSubtotal(lineItem.node)}
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
              <span>
                {calculateCartSubtotal(
                  cart.lines.edges.map((edge) => edge.node)
                )}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <div>
              <a
                target="_blank"
                href={cart.checkoutUrl}
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
}

export default FullCart
