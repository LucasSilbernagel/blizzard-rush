import './Footer.css'

const Footer = () => {
  return (
    <footer className="Footer">
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
