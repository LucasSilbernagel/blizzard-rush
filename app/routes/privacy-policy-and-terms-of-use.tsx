import type { MetaFunction } from '@remix-run/node'
import PrivacyPolicyContent from '../mdx/privacy-policy-and-terms-of-use.mdx'

export const meta: MetaFunction = () => {
  return [
    { title: 'Blizzard Rush | Privacy Policy & Terms of Use' },
    {
      name: 'description',
      content: 'Blizzard Rush privacy policy & terms of use.',
    },
  ]
}

export default function PrivacyPolicy() {
  return (
    <div className="MarkdownPage">
      <PrivacyPolicyContent />
    </div>
  )
}
