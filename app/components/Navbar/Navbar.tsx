import { Link } from '@remix-run/react'
import { useEffect, useState } from 'react'
import MobileNavbar from './MobileNavbar/MobileNavbar'
import DesktopNavbar from './DesktopNavbar/DesktopNavbar'
import './Navbar.css'

const Navbar = () => {
  const [currentScrollPos, setCurrentScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollPos(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`Navbar ${currentScrollPos > 50 ? 'shadow-lg' : ''}`}>
      <ul className="flex justify-end gap-4 bg-black py-2 pr-12 text-xs font-light text-white">
        <li>
          <Link to="/easy-returns" className="ContrastLink">
            Easy Returns
          </Link>
        </li>
        <li>
          <Link to="/help" className="ContrastLink">
            Get Help
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="ContrastLink">
            Wishlist
          </Link>
        </li>
      </ul>
      <MobileNavbar />
      <DesktopNavbar />
    </nav>
  )
}

export default Navbar
