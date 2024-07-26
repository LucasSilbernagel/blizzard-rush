import type { MetaFunction } from '@remix-run/node'
import FreeShippingContent from '../mdx/free-shipping.mdx'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Free Shipping' },
    {
      name: 'description',
      content: 'Free shipping for Blizzard Rush products',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function FreeShipping() {
  return (
    <div className="MarkdownPage">
      <FreeShippingContent />
    </div>
  )
}
