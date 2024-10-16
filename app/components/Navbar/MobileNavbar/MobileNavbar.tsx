import { Link } from '@remix-run/react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { useStoreState } from '~/zustand-store'
import SearchForm from '../SearchForm/SearchForm'

const MobileNavbar = () => {
  const { cart } = useStoreState()

  return (
    <div className="block md:hidden" data-testid="mobile-navbar">
      <ul className="flex items-center justify-between px-6 py-3">
        <li className="font-bold">
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link
            to="/"
            className="bg-black p-1 font-anton text-xl uppercase tracking-wide text-white"
          >
            Blizzard Rush
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            aria-label="cart"
            className="text-2xl font-bold"
            data-testid="cart-link"
          >
            <div className="relative flex items-center gap-1.5">
              {cart.lines?.edges.length > 0 && (
                <span
                  aria-label={`${cart.lines?.edges.length} items in cart`}
                  className="Navbar__cart-number"
                  style={{
                    minWidth: `${Math.max(2, cart.lines.edges.length.toString().length)}em`,
                    height: `${Math.max(2, cart.lines.edges.length.toString().length)}em`,
                    width: `${Math.max(2, cart.lines.edges.length.toString().length)}em`,
                  }}
                >
                  {cart.lines.edges.length}
                </span>
              )}
              <HiOutlineShoppingBag />
            </div>
          </Link>
        </li>
      </ul>
      <SearchForm />
    </div>
  )
}

export default MobileNavbar
