import { Link } from '@remix-run/react'
import { IProduct } from '~/routes/products.$productId'

const Homepage = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      <h1>Blizzard Rush</h1>
      {products && (
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id.split('/').at(-1)}`}>
                  {product.title}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Homepage
