import type { MetaFunction } from '@remix-run/node'
import AboutContent from '../mdx/about.mdx'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | About' },
    {
      name: 'description',
      content: 'All about Blizzard Rush and our mission.',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
    },
  ]
}

export default function About() {
  return (
    <div className="MarkdownPage">
      <AboutContent />
    </div>
  )
}
