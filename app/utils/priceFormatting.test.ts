import {
  getItemSubtotal,
  calculateCartSubtotal,
  CheckoutLineItem,
} from './priceFormatting'

describe('priceFormatting', () => {
  describe('getItemSubtotal', () => {
    it('should calculate the subtotal for a single line item', () => {
      const lineItem: CheckoutLineItem = {
        id: '1',
        quantity: 2,
        merchandise: {
          id: 'm1',
          title: 'Product 1',
          image: { src: 'image1.jpg' },
          price: { amount: 10 },
          product: {
            id: 'p1',
            title: 'Product 1',
            variants: {
              edges: [
                {
                  node: {
                    id: 'v1',
                    title: 'Variant 1',
                    price: { amount: 10 },
                    image: { src: 'image1.jpg' },
                  },
                },
              ],
            },
          },
        },
      }

      const subtotal = getItemSubtotal(lineItem)
      expect(subtotal).toBe('$20.00')
    })
  })

  describe('calculateCartSubtotal', () => {
    it('should calculate the subtotal for multiple line items', () => {
      const lineItems: CheckoutLineItem[] = [
        {
          id: '1',
          quantity: 2,
          merchandise: {
            id: 'm1',
            title: 'Product 1',
            image: { src: 'image1.jpg' },
            price: { amount: 10 },
            product: {
              id: 'p1',
              title: 'Product 1',
              variants: {
                edges: [
                  {
                    node: {
                      id: 'v1',
                      title: 'Variant 1',
                      price: { amount: 10 },
                      image: { src: 'image1.jpg' },
                    },
                  },
                ],
              },
            },
          },
        },
        {
          id: '2',
          quantity: 1,
          merchandise: {
            id: 'm2',
            title: 'Product 2',
            image: { src: 'image2.jpg' },
            price: { amount: 20 },
            product: {
              id: 'p2',
              title: 'Product 2',
              variants: {
                edges: [
                  {
                    node: {
                      id: 'v2',
                      title: 'Variant 2',
                      price: { amount: 20 },
                      image: { src: 'image2.jpg' },
                    },
                  },
                ],
              },
            },
          },
        },
      ]

      const subtotal = calculateCartSubtotal(lineItems)
      expect(subtotal).toBe('$40.00')
    })

    it('should handle an empty cart', () => {
      const lineItems: CheckoutLineItem[] = []
      const subtotal = calculateCartSubtotal(lineItems)
      expect(subtotal).toBe('$0.00')
    })
  })
})
