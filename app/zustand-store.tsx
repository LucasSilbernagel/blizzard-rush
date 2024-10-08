import { StoreApi, UseBoundStore, create } from 'zustand'
import getEnv, { isBrowser } from './get-env'

const env = getEnv()

const cartLocalStorageKey = `shopify_cart_id`
const wishlistLocalStorageKey = `wishlist_titles`
const storefrontApiUrl = `https://${env.SHOPIFY_DOMAIN}/api/2024-04/graphql.json`

// GraphQL queries
const CREATE_CART_MUTATION = `
  mutation {
    cartCreate {
      cart {
        id
        checkoutUrl
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  image {
                            src
                          }
                            price {
                            amount
                          }
                  product {
                    id
                    title
                    variants(first: 250) {
                      edges {
                        node {
                          id
                          price {
                            amount
                          }
                          image {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const GET_CART_QUERY = (cartId: string) => `
  query {
    cart(id: "${cartId}") {
      id
      checkoutUrl
      lines(first: 250) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                image {
                            src
                          }
                            price {
                            amount
                          }
                product {
                  id
                  title
                  variants(first: 250) {
                    edges {
                      node {
                        id
                        price {
                          amount
                        }
                        image {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const ADD_LINE_ITEM_MUTATION = (
  cartId: string,
  variantId: string,
  quantity: number
) => `
  mutation {
    cartLinesAdd(cartId: "${cartId}", lines: [{merchandiseId: "${variantId}", quantity: ${quantity}}]) {
      cart {
        id
        checkoutUrl
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  image {
                            src
                          }
                            price {
                            amount
                          }
                  product {
                    id
                    title
                    variants(first: 250) {
                      edges {
                        node {
                          id
                          price {
                            amount
                          }
                          image {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const REMOVE_LINE_ITEM_MUTATION = (cartId: string, lineItemId: string) => `
  mutation {
    cartLinesRemove(cartId: "${cartId}", lineIds: ["${lineItemId}"]) {
      cart {
        id
        checkoutUrl
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  image {
                            src
                          }
                            price {
                            amount
                          }
                  product {
                    id
                    title
                    variants(first: 250) {
                      edges {
                        node {
                          id
                          price {
                            amount
                          }
                          image {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const UPDATE_LINE_ITEM_MUTATION = (
  cartId: string,
  lineItemId: string,
  quantity: number
) => `
  mutation {
    cartLinesUpdate(cartId: "${cartId}", lines: [{id: "${lineItemId}", quantity: ${quantity}}]) {
      cart {
        id
        checkoutUrl
        lines(first: 250) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  image {
                            src
                          }
                            price {
                            amount
                          }
                  product {
                    id
                    title
                    variants(first: 250) {
                      edges {
                        node {
                          id
                          price {
                            amount
                          }
                          image {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

// Helper function to call Shopify API
const shopifyFetch = async (query: string) => {
  const response = await fetch(storefrontApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        env.STOREFRONT_API_ACCESS_TOKEN || '',
    },
    body: JSON.stringify({ query }),
  })
  const json = await response.json()
  if (json.errors) {
    console.error(json.errors)
  } else {
    return json.data
  }
}

type Cart = {
  id: string
  checkoutUrl: string
  // lines: {
  //   id: string
  //   quantity: number
  //   merchandise: {
  //     id: string
  //     title: string
  //     product: { id: string; price: { amount: number } }
  //     image: { src: string }
  //   }
  // }[]
  lines: {
    edges: {
      node: {
        id: string
        quantity: number
        merchandise: {
          id: string
          title: string
          image: { src: string }
          price: { amount: number }
          product: {
            id: string
            title: string
            price: { amount: number }
            variants?: {
              edges: {
                node: {
                  id: string
                  price: { amount: number }
                  image: { src: string }
                }
              }[]
            }
          }
        }
      }
    }[]
  }
}

type StoreActions = {
  initializeCart: () => Promise<void>
  initializeWishlist: () => Promise<void>
  setWishlistTitles: (wishlistTitles: string[]) => void
  addVariantToCart: (variantId: string, quantity: string) => Promise<void>
  removeLineItem: (cartID: string, lineItemID: string) => Promise<void>
  updateLineItem: (
    cartID: string,
    lineItemID: string,
    quantity: string
  ) => Promise<void>
}

type Store = StoreState & StoreActions

const useStore: UseBoundStore<StoreApi<Store>> = create((set) => ({
  isLoadingShopifyCart: false,
  didJustAddToCart: false,
  wishlistTitles: [],
  cart: {} as Cart,

  setWishlistTitles: (wishlistTitles: string[]) => {
    set({ wishlistTitles, isLoadingShopifyCart: true })
    if (isBrowser) {
      localStorage.setItem(
        wishlistLocalStorageKey,
        wishlistTitles.join(',') || ''
      )
    }
    set({ isLoadingShopifyCart: false })
  },

  initializeWishlist: async () => {
    set({ isLoadingShopifyCart: true })
    const existingWishlistTitles = isBrowser
      ? localStorage.getItem(wishlistLocalStorageKey) || ''
      : ''
    if (existingWishlistTitles && existingWishlistTitles !== 'null') {
      set({ wishlistTitles: existingWishlistTitles.split(',') })
      set({ isLoadingShopifyCart: false })
    } else {
      set({ isLoadingShopifyCart: false })
    }
  },

  initializeCart: async () => {
    set({ isLoadingShopifyCart: true })
    const existingCartID = isBrowser
      ? localStorage.getItem(cartLocalStorageKey) || ''
      : ''
    if (
      existingCartID &&
      existingCartID !== 'null' &&
      existingCartID.length > 0
    ) {
      const data = await shopifyFetch(GET_CART_QUERY(existingCartID))
      if (data && data.cart) {
        set({ cart: data.cart })
        if (isBrowser) {
          localStorage.setItem(cartLocalStorageKey, data.cart.id)
        }
      }
    } else {
      const data = await shopifyFetch(CREATE_CART_MUTATION)
      if (data && data.cartCreate && data.cartCreate.cart) {
        set({ cart: data.cartCreate.cart })
        if (isBrowser) {
          localStorage.setItem(cartLocalStorageKey, data.cartCreate.cart.id)
        }
      }
    }
    set({ isLoadingShopifyCart: false })
  },

  addVariantToCart: async (variantId: string, quantity: string) => {
    const { cart } = useStore.getState()
    if (cart && cart.id) {
      set({ isLoadingShopifyCart: true })
      const cartID = cart.id
      const data = await shopifyFetch(
        ADD_LINE_ITEM_MUTATION(cartID, variantId, parseInt(quantity, 10))
      )
      set({
        cart: data.cartLinesAdd.cart,
        isLoadingShopifyCart: false,
        didJustAddToCart: true,
      })
      setTimeout(() => set({ didJustAddToCart: false }), 1000)
    }
  },

  removeLineItem: async (cartID: string, lineItemID: string) => {
    set({ isLoadingShopifyCart: true })
    const data = await shopifyFetch(
      REMOVE_LINE_ITEM_MUTATION(cartID, lineItemID)
    )
    set({ cart: data.cartLinesRemove.cart, isLoadingShopifyCart: false })
  },

  updateLineItem: async (
    cartID: string,
    lineItemID: string,
    quantity: string
  ) => {
    set({ isLoadingShopifyCart: true })
    const data = await shopifyFetch(
      UPDATE_LINE_ITEM_MUTATION(cartID, lineItemID, parseInt(quantity, 10))
    )
    set({ cart: data.cartLinesUpdate.cart, isLoadingShopifyCart: false })
  },
}))

type StoreState = {
  wishlistTitles: string[]
  cart: Cart
  isLoadingShopifyCart: boolean
  didJustAddToCart: boolean
}

export const useStoreState = useStore
