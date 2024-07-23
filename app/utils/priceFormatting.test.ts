import { getItemSubtotal, calculateCartSubtotal } from './priceFormatting'
import { CheckoutLineItem } from 'shopify-buy'

const commonLineItemAttributes = {
  id: 'gid://shopify/CheckoutLineItem/415457355695130?checkout=040f1764ab86f04b57a69167a10736a2',
  title: 'The Compare at Price Snowboard',
  customAttributes: [],
  discountAllocations: [],
}

const commonVariantAttributes = {
  availableForSale: true,
  metafields: [],
  storeAvailability: [],
  sellingPlanAllocations: [],
  product: {
    availableForSale: false,
    compareAtPriceRange: {
      maxVariantPrice: {
        amount: 0,
        currencyCode: '',
      },
      minVariantPrice: {
        amount: 0,
        currencyCode: '',
      },
    },
    createdAt: '',
    description: '',
    descriptionHtml: '',
    featuredImage: {
      url: '',
      originalSrc: '',
      src: '',
      transformedSrc: '',
    },
    handle: '',
    isGiftCard: false,
    options: [],
    priceRange: {
      maxVariantPrice: {
        amount: 0,
        currencyCode: '',
      },
      minVariantPrice: {
        amount: 0,
        currencyCode: '',
      },
    },
    productType: '',
    publishedAt: '',
    requiresSellingPlan: false,
    seo: {},
    tags: [],
    title: '',
    updatedAt: '',
    vendor: '',
    collections: [],
    images: [],
    media: [],
    sellingPlanGroups: [],
    variants: [],
    id: '',
    metafields: [],
  },
  requiresShipping: true,
  currentlyNotInStock: false,
  compareAtPrice: { amount: 0, currencyCode: 'CAD' },
  barcode: '',
  id: 'gid://shopify/ProductVariant/41545735077993',
  title: 'Dawn',
  weight: 10,
  sku: '',
  image: {
    id: 'gid://shopify/ProductImage/31744903938153',
    src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
    altText:
      'Top and bottom view of a snowboard. The top view shows abstract circles and lines in shades of teal.\n          The bottom view shows abstract circles and lines in shades of purple and blue with the text “SHOPIFY” in a\n          sans serif typeface on top.',
    width: 1600,
    height: 1600,
    url: '',
    originalSrc: '',
    transformedSrc: '',
  },
  selectedOptions: [
    {
      name: 'Color',
      value: 'Dawn',
    },
  ],
}

describe('getItemSubtotal', () => {
  it('should return the correct subtotal for a line item', () => {
    const lineItem: CheckoutLineItem = {
      ...commonLineItemAttributes,
      quantity: 2,
      variant: {
        ...commonVariantAttributes,
        price: {
          amount: 10.0,
          currencyCode: 'USD',
        },
      },
    }
    const subtotal = getItemSubtotal(lineItem)
    expect(subtotal).toBe('$20.00')
  })

  it('should handle a line item with a price of zero', () => {
    const lineItem: CheckoutLineItem = {
      ...commonLineItemAttributes,
      quantity: 3,
      variant: {
        ...commonVariantAttributes,
        price: {
          amount: 0,
          currencyCode: 'USD',
        },
      },
    }
    const subtotal = getItemSubtotal(lineItem)
    expect(subtotal).toBe('$0.00')
  })
})

describe('calculateCartSubtotal', () => {
  it('should return the correct subtotal for a list of line items', () => {
    const lineItems: CheckoutLineItem[] = [
      {
        ...commonLineItemAttributes,
        quantity: 2,
        variant: {
          ...commonVariantAttributes,
          price: {
            amount: 10.0,
            currencyCode: 'USD',
          },
        },
      },
      {
        ...commonLineItemAttributes,
        quantity: 3,
        variant: {
          ...commonVariantAttributes,
          price: {
            amount: 5.0,
            currencyCode: 'USD',
          },
        },
      },
    ]
    const subtotal = calculateCartSubtotal(lineItems)
    expect(subtotal).toBe('$35.00')
  })

  it('should return $0.00 for an empty list of line items', () => {
    const lineItems: CheckoutLineItem[] = []
    const subtotal = calculateCartSubtotal(lineItems)
    expect(subtotal).toBe('$0.00')
  })
})
