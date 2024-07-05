import { StoreApi, UseBoundStore, create } from 'zustand'
import * as React from 'react'
import Client, { CheckoutLineItem } from 'shopify-buy'
import getEnv from './get-env'
import { useEffect } from 'react'

const env = getEnv()

const client: Client = Client.buildClient({
  apiVersion: '2024-04',
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
  setLoading: (isLoadingShopifyBuyData: boolean) => void
  setDidJustAddToCart: (didJustAddToCart: boolean) => void
  initializeCheckout: () => Promise<void>
  initializeWishlist: () => Promise<void>
  setWishlistTitles: (wishlistTitles: string[]) => void
}

type Store = StoreState & StoreActions

const useStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  isOpen: false,
  isLoadingShopifyBuyData: false,
  didJustAddToCart: false,
  client: client,
  wishlistTitles: [] as string[],
  setWishlistTitles: (wishlistTitles: string[]) => {
    set({ wishlistTitles: wishlistTitles, isLoadingShopifyBuyData: true })
    if (isBrowser) {
      localStorage.setItem('wishlistTitles', wishlistTitles.join(',') || '')
    }
    set({ isLoadingShopifyBuyData: false })
  },
  initializeWishlist: async () => {
    set({ isLoadingShopifyBuyData: true })
    const existingWishlistTitles = isBrowser
      ? localStorage.getItem('wishlistTitles') || ''
      : ''

    if (existingWishlistTitles && existingWishlistTitles !== `null`) {
      try {
        set({ wishlistTitles: existingWishlistTitles.split(',') })
        if (isBrowser) {
          localStorage.setItem('wishlistTitles', existingWishlistTitles)
        }
        set({ isLoadingShopifyBuyData: false })
        return
      } catch (e) {
        localStorage.setItem('wishlistTitles', 'null')
        set({ isLoadingShopifyBuyData: false })
      }
    }
  },
  checkout: {} as Checkout,
  setCheckout: (checkout: Checkout) => set({ checkout }),
  setLoading: (isLoadingShopifyBuyData: boolean) =>
    set({ isLoadingShopifyBuyData }),
  setDidJustAddToCart: (didJustAddToCart: boolean) => set({ didJustAddToCart }),
  initializeCheckout: async () => {
    set({ isLoadingShopifyBuyData: true })
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
          set({ isLoadingShopifyBuyData: false })
          return
        }
      } catch (e) {
        localStorage.setItem(localStorageKey, 'null')
        set({ isLoadingShopifyBuyData: false })
      }
    }

    const newCheckout = await client.checkout.create()
    set({ checkout: newCheckout, isLoadingShopifyBuyData: false })
    if (isBrowser) {
      localStorage.setItem(localStorageKey, newCheckout.id)
      set({ isLoadingShopifyBuyData: false })
    }
  },
  addVariantToCart: async (variantId: string, quantity: string) => {
    set({ isLoadingShopifyBuyData: true })
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
    set({
      checkout: res,
      isLoadingShopifyBuyData: false,
      didJustAddToCart: true,
    })
    setTimeout(() => set({ didJustAddToCart: false }), 3000)
  },
  removeLineItem: async (checkoutID: string, lineItemID: string) => {
    set({ isLoadingShopifyBuyData: true })

    const res = await client.checkout.removeLineItems(checkoutID, [lineItemID])
    set({ checkout: res, isLoadingShopifyBuyData: false })
  },
  updateLineItem: async (
    checkoutID: string,
    lineItemID: string,
    quantity: string
  ) => {
    set({ isLoadingShopifyBuyData: true })

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    const res = await client.checkout.updateLineItems(
      checkoutID,
      lineItemsToUpdate
    )
    set({ checkout: res, isLoadingShopifyBuyData: false })
  },
}))

type StoreProviderProps = {
  children: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const initializeCheckout = useStore((state) => state.initializeCheckout)
  const initializeWishlist = useStore((state) => state.initializeWishlist)

  useEffect(() => {
    initializeCheckout()
    initializeWishlist()
  }, [initializeCheckout, initializeWishlist])

  return <>{children}</>
}

interface StoreState {
  wishlistTitles: string[]
  setWishlistTitles: (wishlistTitles: string[]) => void
  checkout: Checkout
  isLoadingShopifyBuyData: boolean
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
