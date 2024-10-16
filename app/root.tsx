import {
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
import baseStyles from '~/index.css?url'
import { LinksFunction } from '@remix-run/node'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'shadcn/components/ui/toaster'
import { TooltipProvider } from 'shadcn/components/ui/tooltip'
import { useState } from 'react'
import { useStoreState } from './zustand-store'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: baseStyles },
]

export async function loader() {
  return json({
    ENV: {
      STOREFRONT_API_ACCESS_TOKEN: process.env.STOREFRONT_API_ACCESS_TOKEN,
      SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
      PROD_DOMAIN: process.env.PROD_DOMAIN,
    },
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  const [navbarHeight, setNavbarHeight] = useState(139)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Anton&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <Navbar setNavbarHeight={setNavbarHeight} />
        </header>
        <TooltipProvider>
          <main style={{ paddingTop: `${navbarHeight}px` }}>{children}</main>
        </TooltipProvider>
        <Toaster />
        <Footer />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const initializeShopCheckout = useStoreState((state) => state.initializeCart)
  const initializeShopWishlist = useStoreState(
    (state) => state.initializeWishlist
  )
  initializeShopCheckout()
  initializeShopWishlist()
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
