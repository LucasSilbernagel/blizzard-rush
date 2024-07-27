import { useEffect, useState } from 'react'
import { Product } from '~/routes/products.$productId'
import { ToggleGroup, ToggleGroupItem } from 'shadcn/components/ui/toggle-group'
import { useStoreState } from '~/zustand-store'
import { Button } from 'shadcn/components/ui/button'
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa6'
import { useToast } from 'shadcn/components/ui/use-toast'
import { Link } from '@remix-run/react'
import { Alert, AlertTitle } from 'shadcn/components/ui/alert'

export default function IndividualProduct({
  product,
}: {
  product: Product | null
}) {
  const {
    didJustAddToCart,
    addVariantToCart,
    wishlistTitles,
    setWishlistTitles,
  } = useStoreState()

  const { toast } = useToast()

  const [selectedVariantId, setSelectedVariantId] = useState<string>('')

  useEffect(() => {
    if (product?.variants) {
      const selectedVariant = product?.variants.edges.find(
        (edge) => edge.node.quantityAvailable > 0
      )
      if (selectedVariant) {
        setSelectedVariantId(selectedVariant.node.id)
      }
    }
  }, [product?.variants])

  useEffect(() => {
    if (didJustAddToCart) {
      toast({
        title: `Added ${product?.title} to cart`,
        description: (
          <div className="mt-2 flex justify-center">
            <Link to="/cart" className="ContrastLink flex items-center gap-2">
              Go to cart <FaArrowRight />
            </Link>
          </div>
        ),
      })
    }
  }, [didJustAddToCart, product?.title, toast])

  const handleAddToCart = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addVariantToCart(selectedVariantId, '1')
  }

  const handleAddToWishlist = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (product) {
      const newWishlistTitles = [...wishlistTitles]
      newWishlistTitles.push(product.title)
      setWishlistTitles(newWishlistTitles)
      toast({
        title: `Added ${product.title} to wishlist`,
        description: (
          <div className="mt-2 flex justify-center">
            <Link
              to="/wishlist"
              className="ContrastLink flex items-center gap-2"
            >
              Go to wishlist <FaArrowRight />
            </Link>
          </div>
        ),
      })
    }
  }

  const SOLD_OUT =
    product?.title !== 'Gift Card' &&
    product?.variants.edges.every((edge) => edge.node.quantityAvailable < 1)

  if (!product) {
    return (
      <div
        className="mx-auto my-44 max-w-screen-sm px-4 text-center"
        data-testid="cart-error-state"
      >
        <Alert variant="destructive">
          <AlertTitle>Product not found</AlertTitle>
        </Alert>
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
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 lg:flex-row">
      <div className="max-w-[720px]">
        <img src={product.featuredImage?.url} alt={product.title} />
      </div>
      <div className="mt-6 max-w-full lg:mt-36 lg:max-w-[400px]">
        <h1 className="text-3xl font-bold lg:text-4xl">{product.title}</h1>
        <h2 className="mt-8 text-2xl font-bold" data-testid="product-price">
          Price:{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number(product.priceRange?.minVariantPrice?.amount))}
        </h2>
        <div className="my-4 h-px w-full bg-gray-300"></div>
        {product.variants.edges.length > 1 && (
          <>
            <h3
              className="mb-4 text-lg font-bold"
              data-testid="selected-variant"
            >
              Variant:{' '}
              <span className="font-normal">
                {
                  product.variants.edges.find(
                    (edge) => edge.node.id === selectedVariantId
                  )?.node.title
                }
              </span>
            </h3>
            <div className="mb-8">
              <ToggleGroup
                type="single"
                value={selectedVariantId}
                variant="outline"
                className="flex-wrap gap-2"
              >
                {product.variants.edges.map((edge) => {
                  return (
                    <ToggleGroupItem
                      key={edge.node.id}
                      value={edge.node.id}
                      onClick={() => setSelectedVariantId(edge.node.id)}
                      disabled={
                        edge.node.quantityAvailable < 1 &&
                        product.title !== 'Gift Card'
                      }
                    >
                      {edge.node.title}
                    </ToggleGroupItem>
                  )
                })}
              </ToggleGroup>
            </div>
          </>
        )}
        <div>
          <div>
            {SOLD_OUT ? (
              <div>
                <p className="bg-slate-100 py-2 text-center font-bold uppercase text-red-600">
                  Sold out!
                </p>
              </div>
            ) : (
              <Button onClick={handleAddToCart} className="w-full">
                Add to cart
              </Button>
            )}
          </div>
          <div className="mt-2 flex w-full justify-end">
            <Button
              className="flex items-center gap-2"
              variant="ghost"
              onClick={handleAddToWishlist}
            >
              <FaPlus /> Add to wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
