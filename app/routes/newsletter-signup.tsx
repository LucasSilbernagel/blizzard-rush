import type { MetaFunction } from '@remix-run/node'
import NewsletterSignup from '~/components/NewsletterSignup/NewsletterSignup'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Newsletter Signup' },
    {
      name: 'description',
      content:
        'Sign up for the Blizzard Rush newsletter to get the latest news and updates.',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function Newsletter() {
  return <NewsletterSignup />
}
