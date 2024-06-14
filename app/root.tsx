import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import stylesheet from '~/tailwind.css?url'
import { LinksFunction } from '@remix-run/node'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export async function loader() {
  return json({
    ENV: {
      ADMIN_API_ACCESS_TOKEN: process.env.ADMIN_API_ACCESS_TOKEN,
      STOREFRONT_API_ACCESS_TOKEN: process.env.STOREFRONT_API_ACCESS_TOKEN,
      API_KEY: process.env.API_KEY,
      API_SECRET_KEY: process.env.API_SECRET_KEY,
      SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    },
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <div className="text-white bg-black flex justify-end gap-4 pr-4">
            <div>
              <Link to="/returns">Easy Returns</Link>
            </div>
            <div>
              <Link to="/returns">Get Help</Link>
            </div>
            <div>
              <Link to="/returns">Wishlist</Link>
            </div>
          </div>
        </header>
        {children}
        <footer>
          <p>
            Built by{' '}
            <a
              href="https://lucassilbernagel.com/"
              target="_blank"
              rel="noreferrer"
            >
              Lucas Silbernagel
            </a>
          </p>
        </footer>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
