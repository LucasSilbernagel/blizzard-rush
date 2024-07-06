import type { MetaFunction } from '@remix-run/node'
import EasyReturnsContent from '../mdx/easy-returns.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Easy Returns' },
    {
      name: 'description',
      content: 'Easy returns for Blizzard Rush products',
    },
  ]
}

export default function EasyReturns() {
  return (
    <div className="MarkdownPage">
      <EasyReturnsContent />
    </div>
  )
}
