import { Link } from '@remix-run/react'
import { Product } from '~/routes/products.$productId'
import { Button } from 'shadcn/components/ui/button'
import { FaTrash } from 'react-icons/fa6'
import { useStoreState } from '~/zustand-store'

type ProductListItemProps = {
  product: Product
  isWishlistPage?: boolean
  isSoldOut: boolean
  variantsAvailable: number
}

const ProductListItem = (props: ProductListItemProps) => {
  const {
    product,
    isWishlistPage = false,
    isSoldOut,
    variantsAvailable,
  } = props

  const { setWishlistTitles, wishlistTitles } = useStoreState()

  return (
    <li key={product.id} className="relative flex justify-center">
      {isWishlistPage && (
        <div className="absolute right-0 top-0 z-10">
          <Button
            aria-label={`Remove ${product.title} from wishlist`}
            variant="ghost"
            onClick={() => {
              const oldWishlistTitles = [...wishlistTitles]
              setWishlistTitles(
                oldWishlistTitles.filter((title) => title !== product.title)
              )
            }}
          >
            <FaTrash />
          </Button>
        </div>
      )}
      <Link
        to={`/products/${product.id.split('/').at(-1)}`}
        className="ProductList__product-link"
      >
        <div className="ProductList__product-image">
          <img
            src={product.featuredImage.url}
            alt={product.title}
            className="max-h-[284px] max-w-[284px]"
          />
        </div>
        <div className="ProductList__product-footer">
          {variantsAvailable > 1 && (
            <div>
              <span className="text-sm">
                {`${variantsAvailable} variants available`}
              </span>
            </div>
          )}
          <div>
            <span className="text-base font-bold">{product.title}</span>
          </div>
          <div>
            <span>
              {isSoldOut ? (
                <span className="bg-slate-950 p-0.5 font-bold uppercase text-white">
                  Sold out
                </span>
              ) : (
                `${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(product.priceRange.minVariantPrice.amount))}`
              )}
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ProductListItem
