import type { MetaFunction } from '@remix-run/node'
import ShippingPolicyContent from '../mdx/shipping-policy.mdx'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Shipping Policy' },
    {
      name: 'description',
      content: 'Shipping policy for Blizzard Rush products',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function ShippingPolicy() {
  return (
    <div className="MarkdownPage">
      <ShippingPolicyContent />
    </div>
  )
}
