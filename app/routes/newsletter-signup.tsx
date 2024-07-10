import type { MetaFunction } from '@remix-run/node'
import NewsletterSignup from '~/components/NewsletterSignup/NewsletterSignup'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Newsletter Signup' },
    {
      name: 'description',
      content:
        'Sign up for the Blizzard Rush newsletter to get the latest news and updates.',
    },
  ]
}

export default function Newsletter() {
  return <NewsletterSignup />
}
