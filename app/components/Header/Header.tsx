import { Link } from '@remix-run/react'

const Header = () => {
  return (
    <header>
      <div className="text-white bg-black flex justify-end gap-4 pr-12 py-2 text-xs font-light">
        <div>
          <Link to="/easy-returns">Easy Returns</Link>
        </div>
        <div>
          <Link to="/help">Get Help</Link>
        </div>
        <div>
          <Link to="/wishlist">Wishlist</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
