import { Alert, AlertDescription, AlertTitle } from 'shadcn/components/ui/alert'
import { Link } from '@remix-run/react'
import { FaArrowLeft } from 'react-icons/fa6'
import { CartProductInfo } from '~/routes/cart'
import { useStoreState } from '~/zustand-store'
import FullCart from './FullCart/FullCart'

type CartProps = {
  error: Error | null
  data?: CartProductInfo
  refetch: () => void
}

const Cart = (props: CartProps) => {
  const { error, data, refetch } = props

  const { cart } = useStoreState()

  if (error) {
    // Error state
    return (
      <div
        className="mx-auto my-44 max-w-screen-sm text-center"
        data-testid="cart-error-state"
      >
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || 'An error occurred, please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    )
  } else if (!cart?.lines || cart.lines.edges.length < 1) {
    // Empty cart state
    return (
      <div className="pt-16">
        <h1 className="my-6 pt-16 text-center font-anton text-3xl uppercase tracking-wide xl:pt-0">
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
  } else {
    // Full cart state
    return <FullCart data={data} refetch={refetch} />
  }
}

export default Cart
