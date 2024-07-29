import { Link } from '@remix-run/react'
import { RxCountdownTimer } from 'react-icons/rx'
import { LiaShippingFastSolid } from 'react-icons/lia'
import { FaCanadianMapleLeaf, FaArrowRight, FaFacebookF } from 'react-icons/fa'
import { FaInstagram, FaYoutube } from 'react-icons/fa6'
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
      <div className="bg-black px-4 pb-8 pt-16 text-white lg:px-44">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="mx-auto mb-12 max-w-[367px] lg:mx-0 lg:mb-0">
            <h3 className="mb-2 font-anton text-3xl uppercase tracking-wider">
              Join our newsletter
            </h3>
            <p>
              Join our mailing list! Subscribe to the Blizzard Rush Newsletter
              and save 10% on your next order.
            </p>
            <Link
              to="/newsletter-signup"
              className="BrightnessLink my-4 flex max-w-max items-center gap-4 bg-white px-3 py-2 font-bold text-black"
            >
              Sign Up <FaArrowRight />
            </Link>
            <p className="text-xs" data-testid="email-signup-disclaimer">
              By entering your email, you agree to our{' '}
              <Link
                to="privacy-policy-and-terms-of-use"
                className="BrightnessLink"
              >
                Privacy Policy and Terms of Use
              </Link>
              , including receipt of emails and promotions. You can unsubscribe
              at any time.
            </p>
          </div>
          <div>
            <div className="mx-auto flex max-w-max justify-around gap-12 lg:justify-start">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link className="BrightnessLink" to="/wishlist">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link className="BrightnessLink" to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="BrightnessLink" to="/help">
                    Get Help
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link className="BrightnessLink" to="/easy-returns">
                    Easy Returns
                  </Link>
                </li>
                <li>
                  <Link className="BrightnessLink" to="/free-shipping">
                    Free Shipping
                  </Link>
                </li>
                <li>
                  <Link className="BrightnessLink" to="/shipping-policy">
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="mt-24 flex justify-center gap-12 text-2xl lg:justify-start">
              <li>
                <a
                  href="/#"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="BrightnessLink"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="BrightnessLink"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  target="_blank"
                  rel="noopener"
                  aria-label="YouTube"
                  className="BrightnessLink"
                >
                  <FaYoutube />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-6 h-0.5 w-full bg-white"></div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <div>
            <p className="mb-2">
              Built by{' '}
              <a
                href="https://lucassilbernagel.com/"
                target="_blank"
                rel="noreferrer"
                className="BrightnessLink underline underline-offset-2"
              >
                Lucas Silbernagel
              </a>
            </p>
          </div>
          <div>
            <p>
              Design inspiration:{' '}
              <a
                href="https://thinkempire.com/collections/snowboards"
                target="_blank"
                rel="noreferrer"
                className="BrightnessLink underline underline-offset-2"
              >
                Empire
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
