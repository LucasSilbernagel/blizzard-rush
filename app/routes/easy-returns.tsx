import type { MetaFunction } from '@remix-run/node'
import EasyReturnsContent from '../mdx/easy-returns.mdx'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Easy Returns' },
    {
      name: 'description',
      content: 'Easy returns for Blizzard Rush products',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
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
