import { StoreApi, UseBoundStore, create } from 'zustand'
import React, { useEffect } from 'react'
import Client, { CheckoutLineItem } from 'shopify-buy'
import getEnv, { isBrowser } from './get-env'

const env = getEnv()

const client: Client = Client.buildClient({
  apiVersion: '2024-04',
  domain: env.SHOPIFY_DOMAIN || '',
  storefrontAccessToken: env.STOREFRONT_API_ACCESS_TOKEN || '',
})

const checkoutLocalStorageKey = `shopify_checkout_id`

const wishlistLocalStorageKey = `wishlist_titles`

type Checkout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

type StoreActions = {
  initializeCheckout: () => Promise<void>
  initializeWishlist: () => Promise<void>
  setWishlistTitles: (wishlistTitles: string[]) => void
}

type Store = StoreState & StoreActions

const useStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  isLoadingShopifyBuyData: false,
  didJustAddToCart: false,
  client: client,
  wishlistTitles: [],
  setWishlistTitles: (wishlistTitles: string[]) => {
    set({ wishlistTitles: wishlistTitles, isLoadingShopifyBuyData: true })
    if (isBrowser) {
      localStorage.setItem(
        wishlistLocalStorageKey,
        wishlistTitles.join(',') || ''
      )
    }
    set({ isLoadingShopifyBuyData: false })
  },
  initializeWishlist: async () => {
    set({ isLoadingShopifyBuyData: true })
    const existingWishlistTitles = isBrowser
      ? localStorage.getItem(wishlistLocalStorageKey) || ''
      : ''

    if (existingWishlistTitles && existingWishlistTitles !== `null`) {
      try {
        set({ wishlistTitles: existingWishlistTitles.split(',') })
        if (isBrowser) {
          localStorage.setItem(wishlistLocalStorageKey, existingWishlistTitles)
        }
        set({ isLoadingShopifyBuyData: false })
        return
      } catch (e) {
        localStorage.setItem(wishlistLocalStorageKey, 'null')
        set({ isLoadingShopifyBuyData: false })
      }
    }
  },
  checkout: {} as Checkout,
  initializeCheckout: async () => {
    set({ isLoadingShopifyBuyData: true })
    const existingCheckoutID = isBrowser
      ? localStorage.getItem(checkoutLocalStorageKey) || ''
      : ''

    if (existingCheckoutID && existingCheckoutID !== `null`) {
      try {
        const existingCheckout = await client.checkout.fetch(existingCheckoutID)
        if (!existingCheckout.completedAt) {
          set({ checkout: existingCheckout })
          if (isBrowser) {
            localStorage.setItem(checkoutLocalStorageKey, existingCheckout.id)
          }
          set({ isLoadingShopifyBuyData: false })
          return
        }
      } catch (e) {
        localStorage.setItem(checkoutLocalStorageKey, 'null')
        set({ isLoadingShopifyBuyData: false })
      }
    } else {
      const newCheckout = await client.checkout.create()
      set({ checkout: newCheckout, isLoadingShopifyBuyData: false })
      if (isBrowser) {
        localStorage.setItem(checkoutLocalStorageKey, newCheckout.id)
        set({ isLoadingShopifyBuyData: false })
      }
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
    setTimeout(() => set({ didJustAddToCart: false }), 1000)
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

type StoreState = {
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
