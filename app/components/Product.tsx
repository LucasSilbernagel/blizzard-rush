import { IProduct } from '~/routes/products.$productId'

export default function Product({ product }: { product: IProduct }) {
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
    </div>
  )
}
