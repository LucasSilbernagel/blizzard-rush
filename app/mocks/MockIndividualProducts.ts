import { Product } from '~/routes/products.$productId'

export const MOCK_PRODUCT_WITH_VARIANTS: Product = {
  id: 'gid://shopify/Product/7313620631657',
  title: 'The Complete Snowboard',
  featuredImage: {
    url: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
  },
  priceRange: {
    minVariantPrice: {
      amount: '699.95',
    },
  },
  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545734979689',
          title: 'Ice',
          quantityAvailable: 100,
        },
      },
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545735077993',
          title: 'Dawn',
          quantityAvailable: 100,
        },
      },
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545735110761',
          title: 'Powder',
          quantityAvailable: 100,
        },
      },
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545735209065',
          title: 'Electric',
          quantityAvailable: 100,
        },
      },
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545735241833',
          title: 'Sunset',
          quantityAvailable: 100,
        },
      },
    ],
  },
}

export const MOCK_PRODUCT_WITHOUT_VARIANTS: Product = {
  id: 'gid://shopify/Product/7313620861033',
  title: 'The 3p Fulfilled Snowboard',
  featuredImage: {
    url: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1716602384',
  },
  priceRange: {
    minVariantPrice: {
      amount: '2629.95',
    },
  },
  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545735602281',
          title: 'Default Title',
          quantityAvailable: 1000,
        },
      },
    ],
  },
}

export const MOCK_SOLD_OUT_PRODUCT: Product = {
  id: 'gid://shopify/Product/7313620664425',
  title: 'The Out of Stock Snowboard',
  featuredImage: {
    url: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_f44a9605-cd62-464d-b095-d45cdaa0d0d7.jpg?v=1716602383',
  },
  priceRange: {
    minVariantPrice: {
      amount: '885.95',
    },
  },
  variants: {
    edges: [
      {
        node: {
          id: 'gid://shopify/ProductVariant/41545735307369',
          title: 'Default Title',
          quantityAvailable: 0,
        },
      },
    ],
  },
}
