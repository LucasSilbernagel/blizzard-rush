import type { MetaFunction } from '@remix-run/node'
import HelpContent from '../mdx/help.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Help' },
    {
      name: 'description',
      content: 'Get help regarding Blizzard Rush products',
    },
    {
      property: 'og:image',
      content: 'https://blizzard-rush.vercel.app/seo/homepage.png',
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
