import type { MetaFunction } from '@remix-run/node'
import FreeShippingContent from '../mdx/free-shipping.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Free Shipping' },
    {
      name: 'description',
      content: 'Free shipping for Blizzard Rush products',
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
