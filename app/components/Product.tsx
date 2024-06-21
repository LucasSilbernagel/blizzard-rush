import React, { useState } from 'react'
import { IProduct } from '~/routes/products.$productId'

export default function Product({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantity(Number(event.target.value))
  }

  const handleAddToCart = async () => {
    console.log(`Adding ${quantity} ${product.title}(s) to cart`)
  }

  if (!product) {
    console.log('no data')
    return null
  }

  const { title, featuredImage, priceRange } = product

  return (
    <div>
      <h1>{title}</h1>
      <img src={featuredImage?.url} alt={title} />
      <p>Price: {priceRange?.minVariantPrice?.amount}</p>
      <label htmlFor="quantity">Quantity:</label>
      <select id="quantity" value={quantity} onChange={handleQuantityChange}>
        {Array.from(
          {
            length: Math.min(
              product.variants.edges[0].node.quantityAvailable,
              10
            ),
          },
          (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          )
        )}
      </select>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
