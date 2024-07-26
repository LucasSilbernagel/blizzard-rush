import type { MetaFunction } from '@remix-run/node'
import PrivacyPolicyContent from '../mdx/privacy-policy-and-terms-of-use.mdx'
import getEnv from '~/get-env'

export const meta: MetaFunction = () => {
  const env = getEnv()
  return [
    { title: 'Blizzard Rush | Privacy Policy & Terms of Use' },
    {
      name: 'description',
      content: 'Blizzard Rush privacy policy & terms of use.',
    },
    {
      property: 'og:image',
      content: `${env.PROD_DOMAIN}/seo/homepage.png`,
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
