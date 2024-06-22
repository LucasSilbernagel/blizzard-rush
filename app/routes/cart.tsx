import { useStoreState } from '~/zustand-store'

export default function CartPage() {
  const { checkout } = useStoreState()
  return (
    <div>
      <h1>Cart</h1>
      <ul className="bg-yellow-200">
        {checkout.lineItems?.map((lineItem) => {
          return <li key={lineItem.id}>{lineItem.title}</li>
        })}
      </ul>
      <a
        target="_blank"
        href={checkout.webUrl}
        rel="noreferrer"
        className="mt-2 inline-block rounded bg-black p-2 text-white"
      >
        Complete checkout
      </a>
    </div>
  )
}
