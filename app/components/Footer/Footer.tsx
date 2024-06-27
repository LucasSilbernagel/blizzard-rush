import { Link } from '@remix-run/react'
import { RxCountdownTimer } from 'react-icons/rx'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { FaCanadianMapleLeaf } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="Footer">
      <ul className="Footer__Shipping-banner">
        <li>
          <RxCountdownTimer />{' '}
          <Link to="/easy-returns">30 Days Easy Returns</Link>
        </li>
        <li>
          <LiaShippingFastSolid />{' '}
          <Link to="/free-shipping">
            Free Shipping on orders of $98+ (Regular Price Items)
          </Link>
        </li>
        <li>
          <FaCanadianMapleLeaf />{' '}
          <Link to="/shipping-policy">We Ship from Canada</Link>
        </li>
      </ul>
      <p className="mb-2">
        Built by{' '}
        <a
          href="https://lucassilbernagel.com/"
          target="_blank"
          rel="noreferrer"
        >
          Lucas Silbernagel
        </a>
      </p>
      <p>
        Design inspiration:{' '}
        <a
          href="https://thinkempire.com/collections/snowboards"
          target="_blank"
          rel="noreferrer"
        >
          Empire
        </a>
      </p>
    </footer>
  )
}

export default Footer
