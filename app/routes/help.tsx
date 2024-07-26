import type { MetaFunction } from '@remix-run/node'
import HelpContent from '../mdx/help.mdx'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Help' },
    {
      name: 'description',
      content: 'Get help regarding Blizzard Rush products',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function Help() {
  return (
    <div className="MarkdownPage">
      <HelpContent />
    </div>
  )
}
