import { http, HttpResponse } from 'msw'
import { MOCK_CHECKOUT } from './MockCheckout'

export const handlers = [
  http.post(
    'https://example.myshopify.com/api/2024-04/graphql',
    async ({ request }) => {
      const req = await request.json()
      if (JSON.stringify(req).includes('checkoutCreate')) {
        return HttpResponse.json({
          data: {
            checkoutCreate: {
              userErrors: [],
              checkoutUserErrors: [],
              checkout: {
                id: 'gid://shopify/Checkout/41dfd9366b7907b8324ff2d77e71c9ab?key=4162928be09a64e0087fd13d7fa8be0d',
                ready: false,
                requiresShipping: false,
                note: null,
                paymentDue: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                paymentDueV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                webUrl:
                  'https://blizzardrush.myshopify.com/58975060073/checkouts/41dfd9366b7907b8324ff2d77e71c9ab?key=4162928be09a64e0087fd13d7fa8be0d',
                orderStatusUrl: null,
                taxExempt: false,
                taxesIncluded: false,
                currencyCode: 'CAD',
                totalTax: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalTaxV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                lineItemsSubtotalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                subtotalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                subtotalPriceV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalPriceV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                completedAt: null,
                createdAt: '2024-07-20T00:12:45Z',
                updatedAt: '2024-07-20T00:12:45Z',
                email: null,
                discountApplications: {
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                  edges: [],
                },
                appliedGiftCards: [],
                shippingAddress: null,
                shippingLine: null,
                customAttributes: [],
                order: null,
                lineItems: {
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                  edges: [],
                },
              },
            },
          },
        })
      } else if (JSON.stringify(req).includes('checkoutLineItemsAdd')) {
        return HttpResponse.json({
          data: {
            checkoutLineItemsAdd: {
              userErrors: [],
              checkoutUserErrors: [],
              checkout: {
                id: 'gid://shopify/Checkout/41dfd9366b7907b8324ff2d77e71c9ab?key=4162928be09a64e0087fd13d7fa8be0d',
                ready: false,
                requiresShipping: false,
                note: null,
                paymentDue: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                paymentDueV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                webUrl:
                  'https://blizzardrush.myshopify.com/58975060073/checkouts/41dfd9366b7907b8324ff2d77e71c9ab?key=4162928be09a64e0087fd13d7fa8be0d',
                orderStatusUrl: null,
                taxExempt: false,
                taxesIncluded: false,
                currencyCode: 'CAD',
                totalTax: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalTaxV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                lineItemsSubtotalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                subtotalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                subtotalPriceV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalPriceV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                completedAt: null,
                createdAt: '2024-07-20T00:12:45Z',
                updatedAt: '2024-07-20T00:12:45Z',
                email: null,
                discountApplications: {
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                  edges: [],
                },
                appliedGiftCards: [],
                shippingAddress: null,
                shippingLine: null,
                customAttributes: [],
                order: null,
                lineItems: {
                  edges: [],
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                },
              },
            },
          },
        })
      } else if (JSON.stringify(req).includes('Checkout')) {
        return HttpResponse.json({
          data: {
            checkoutCreate: {
              userErrors: [],
              checkoutUserErrors: [],
              checkout: {
                id: 'gid://shopify/Checkout/41dfd9366b7907b8324ff2d77e71c9ab?key=4162928be09a64e0087fd13d7fa8be0d',
                ready: false,
                requiresShipping: false,
                note: null,
                paymentDue: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                paymentDueV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                webUrl:
                  'https://blizzardrush.myshopify.com/58975060073/checkouts/41dfd9366b7907b8324ff2d77e71c9ab?key=4162928be09a64e0087fd13d7fa8be0d',
                orderStatusUrl: null,
                taxExempt: false,
                taxesIncluded: false,
                currencyCode: 'CAD',
                totalTax: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalTaxV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                lineItemsSubtotalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                subtotalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                subtotalPriceV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalPrice: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                totalPriceV2: {
                  amount: '0.0',
                  currencyCode: 'CAD',
                },
                completedAt: null,
                createdAt: '2024-07-20T00:12:45Z',
                updatedAt: '2024-07-20T00:12:45Z',
                email: null,
                discountApplications: {
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                  edges: [],
                },
                appliedGiftCards: [],
                shippingAddress: null,
                shippingLine: null,
                customAttributes: [],
                order: null,
                lineItems: {
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                  edges: MOCK_CHECKOUT.lineItems.map((lineItem, index) => {
                    return {
                      cursor: String(index),
                      node: {
                        id: lineItem.id,
                        title: lineItem.title,
                        variant: {
                          id: lineItem.variant?.id,
                          title: lineItem.variant?.title,
                          price: lineItem.variant?.price,
                          image: { src: lineItem.variant?.image.src },
                        },
                        quantity: lineItem.quantity,
                      },
                    }
                  }),
                },
              },
            },
          },
        })
      }
    }
  ),
]
