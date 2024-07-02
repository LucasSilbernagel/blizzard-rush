import { Link } from '@remix-run/react'
import skiing from '../images/skiing.mp4'
import { FaArrowLeft } from 'react-icons/fa6'

export default function PageNotFound() {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        maxWidth: '100%',
      }}
    >
      <video
        autoPlay
        loop
        muted
        id="video-background"
        style={{
          position: 'fixed',
          right: '0',
          bottom: '0',
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '100%',
          zIndex: '-1',
        }}
      >
        <source src={skiing} type="video/mp4" />
      </video>
      <div
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '103.4%',
          zIndex: '10',
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          zIndex: '20',
        }}
      >
        <h1 className="font-anton text-9xl">404</h1>
        <h2 className="my-6 text-2xl">Page not found.</h2>
        <div className="mx-auto my-16 max-w-max">
          <Link
            to="/"
            className="BrightnessLink flex w-full items-center gap-2 bg-theme-yellow px-4 py-2 text-center text-2xl font-bold text-black"
          >
            <FaArrowLeft /> Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
