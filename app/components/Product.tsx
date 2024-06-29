import { useEffect, useState } from 'react'
import { IProduct } from '~/routes/products.$productId'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { useStoreState } from '~/zustand-store'
import { Button } from '@/components/ui/button'
import { FaArrowRight, FaPlus } from 'react-icons/fa6'
import { useToast } from '@/components/ui/use-toast'
import { Link } from '@remix-run/react'

export default function Product({ product }: { product: IProduct }) {
  const { title, featuredImage, priceRange, variants } = product

  const { didJustAddToCart, addVariantToCart } = useStoreState()

  const { toast } = useToast()

  const [selectedVariantId, setSelectedVariantId] = useState<string>('')

  useEffect(() => {
    if (variants) {
      const selectedVariant = variants.edges.find(
        (edge) => edge.node.quantityAvailable > 0
      )
      if (selectedVariant) {
        setSelectedVariantId(selectedVariant.node.id)
      }
    }
  }, [variants])

  useEffect(() => {
    if (didJustAddToCart) {
      toast({
        title: `Added ${title} to cart`,
        description: (
          <Link to="/cart" className="flex gap-2">
            Go to cart <FaArrowRight />
          </Link>
        ),
      })
    }
  }, [didJustAddToCart, title, toast])

  const handleAddToCart = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    addVariantToCart(selectedVariantId, '1')
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:flex-row">
      <div className="max-w-[720px]">
        <img src={featuredImage?.url} alt={title} />
      </div>
      <div className="mt-6 max-w-full lg:mt-36 lg:max-w-[400px]">
        <h1 className="text-3xl font-bold lg:text-4xl">{title}</h1>
        <h2 className="mt-8 text-2xl font-bold">
          Price: ${priceRange?.minVariantPrice?.amount}
        </h2>
        <div className="my-4 h-px w-full bg-gray-300"></div>
        <h3 className="mb-4 text-lg font-bold">
          Variant:{' '}
          <span className="font-normal">
            {
              variants.edges.find((edge) => edge.node.id === selectedVariantId)
                ?.node.title
            }
          </span>
        </h3>
        <div className="mb-8">
          <ToggleGroup
            type="single"
            value={selectedVariantId}
            variant="outline"
            className="flex-wrap"
          >
            {variants.edges.map((edge) => {
              return (
                <ToggleGroupItem
                  key={edge.node.id}
                  value={edge.node.id}
                  onClick={() => setSelectedVariantId(edge.node.id)}
                  disabled={edge.node.quantityAvailable < 1}
                >
                  {edge.node.title}
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </div>
        <div>
          <div>
            <Button onClick={handleAddToCart} className="w-full">
              Add to cart
            </Button>
          </div>
          <div className="mt-2 flex w-full justify-end">
            <Button variant="ghost">
              <FaPlus /> Add to wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
