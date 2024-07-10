import { MetaFunction } from '@remix-run/node'
import FallbackPage from '~/components/FallbackPage/FallbackPage'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | 404' },
    { name: 'description', content: 'Shop snowboards from Blizzard Rush' },
    {
      property: 'og:image',
      content: 'https://blizzard-rush.vercel.app/seo/homepage.png',
    },
  ]
}

export default function PageNotFound() {
  return <FallbackPage />
}
