import { Link } from '@remix-run/react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { useStoreState } from '~/zustand-store'
import SearchForm from '../SearchForm/SearchForm'

const DesktopNavbar = () => {
  const { checkout } = useStoreState()

  return (
    <div className="hidden px-16 py-6 md:block" data-testid="desktop-navbar">
      <ul className="flex items-center justify-between">
        <li>
          <Link
            to="/"
            className="bg-black p-1.5 font-anton text-3xl uppercase tracking-wide text-white"
          >
            Blizzard Rush
          </Link>
        </li>
        <li>
          <ul className="flex items-center gap-6">
            <li>
              <SearchForm />
            </li>
            <li className="text-xl font-bold">
              <Link to="/about" className="ContrastLink">
                About
              </Link>
            </li>
            <li>
              <Link
                data-testid="cart-link"
                to="/cart"
                className={`text-xl font-bold ${checkout.lineItems?.length > 0 ? 'CartLink' : 'ContrastLink'}`}
              >
                <div className="relative flex items-center gap-1.5">
                  {checkout.lineItems?.length > 0 && (
                    <span
                      aria-label={`${checkout.lineItems.length} items in cart`}
                      className="Navbar__cart-number"
                      style={{
                        minWidth: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                        height: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                        width: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                      }}
                    >
                      {checkout.lineItems.length}
                    </span>
                  )}
                  <HiOutlineShoppingBag /> Cart
                </div>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default DesktopNavbar
