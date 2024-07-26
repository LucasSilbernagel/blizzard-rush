import { MetaFunction } from '@remix-run/node'
import FallbackPage from '~/components/FallbackPage/FallbackPage'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | 404' },
    { name: 'description', content: 'Shop snowboards from Blizzard Rush' },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function PageNotFound() {
  return <FallbackPage />
}
