import type { MetaFunction } from '@remix-run/node'
import AboutContent from '../mdx/about.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | About' },
    {
      name: 'description',
      content: 'All about Blizzard Rush and our mission.',
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
