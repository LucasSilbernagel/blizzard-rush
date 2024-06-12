import { Outlet } from '@remix-run/react'
import { IProduct, loader } from './routes/products.$productId'
import { LoaderFunctionArgs } from '@remix-run/node'

interface Route {
  path: string
  loader: LoaderFunction
}

export default function Root() {
  return (
    <html lang="en">
      <head>{/* ... */}</head>
      <body>
        <Outlet />
      </body>
    </html>
  )
}

export const routes: Route[] = [
  {
    path: '/products/:productId',
    loader: loader,
  },
]

interface Route {
  path: string
  loader: LoaderFunction
}

export type LoaderFunction = (
  args: LoaderFunctionArgs
) => Promise<IProduct | null>
