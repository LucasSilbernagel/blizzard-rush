import { StoreApi, UseBoundStore, create } from 'zustand'
import * as React from 'react'
import Client, { CheckoutLineItem } from 'shopify-buy'
import getEnv from './get-env'

const env = getEnv()

const client: Client = Client.buildClient({
  apiVersion: '2023-01',
  domain: env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: env.STOREFRONT_API_ACCESS_TOKEN || '',
})

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

type Checkout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

interface StoreActions {
  setCheckout: (checkout: Checkout) => void
  setLoading: (loading: boolean) => void
  setDidJustAddToCart: (didJustAddToCart: boolean) => void
  initializeCheckout: () => Promise<void>
}

type Store = StoreState & StoreActions

const useStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  cart: [],
  isOpen: false,
  loading: false,
  didJustAddToCart: false,
  client: client,
  checkout: {} as Checkout,
  setCheckout: (checkout: Checkout) => set({ checkout }),
  setLoading: (loading: boolean) => set({ loading }),
  setDidJustAddToCart: (didJustAddToCart: boolean) => set({ didJustAddToCart }),
  initializeCheckout: async () => {
    const existingCheckoutID = isBrowser
      ? localStorage.getItem(localStorageKey) || ''
      : ''

    if (existingCheckoutID && existingCheckoutID !== `null`) {
      try {
        const existingCheckout = await client.checkout.fetch(existingCheckoutID)
        if (!existingCheckout.completedAt) {
          set({ checkout: existingCheckout })
          if (isBrowser) {
            localStorage.setItem(localStorageKey, existingCheckout.id)
          }
          return
        }
      } catch (e) {
        localStorage.setItem(localStorageKey, 'null')
      }
    }

    const newCheckout = await client.checkout.create()
    set({ checkout: newCheckout })
    if (isBrowser) {
      localStorage.setItem(localStorageKey, newCheckout.id)
    }
  },
  addVariantToCart: async (variantId: string, quantity: string) => {
    set({ loading: true })
    const { checkout } = useStore.getState()
    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ]

    const res = await client.checkout.addLineItems(
      checkoutID,
      lineItemsToUpdate
    )
    set({ checkout: res, loading: false, didJustAddToCart: true })
    setTimeout(() => set({ didJustAddToCart: false }), 3000)
  },
  removeLineItem: async (checkoutID: string, lineItemID: string) => {
    set({ loading: true })

    const res = await client.checkout.removeLineItems(checkoutID, [lineItemID])
    set({ checkout: res, loading: false })
  },
  updateLineItem: async (
    checkoutID: string,
    lineItemID: string,
    quantity: string
  ) => {
    set({ loading: true })

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    const res = await client.checkout.updateLineItems(
      checkoutID,
      lineItemsToUpdate
    )
    set({ checkout: res, loading: false })
  },
}))

type StoreProviderProps = {
  children: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const initializeCheckout = useStore((state) => state.initializeCheckout)

  React.useEffect(() => {
    initializeCheckout()
  }, [initializeCheckout])

  return <>{children}</>
}

interface StoreState {
  checkout: Checkout
  loading: boolean
  didJustAddToCart: boolean
  addVariantToCart: (variantId: string, quantity: string) => Promise<void>
  removeLineItem: (checkoutID: string, lineItemID: string) => Promise<void>
  updateLineItem: (
    checkoutID: string,
    lineItemID: string,
    quantity: string
  ) => Promise<void>
}

export const useStoreState = useStore
