import type { MetaFunction } from '@remix-run/node'
import AboutContent from '../mdx/about.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | About' },
    {
      name: 'description',
      content: 'Shop snowboards from Blizzard Rush',
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
