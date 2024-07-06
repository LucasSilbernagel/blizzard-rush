import type { MetaFunction } from '@remix-run/node'
import ShippingPolicyContent from '../mdx/shipping-policy.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Shipping Policy' },
    {
      name: 'description',
      content: 'Shipping policy for Blizzard Rush products',
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
