import { Cart } from '~/zustand-store'

export const MOCK_CART: Cart = {
  id: 'gid://shopify/Cart/Z2NwLXVzLWNlbnRyYWwxOjAxSjlKQ0s4NVBKMUEyVEtZWkZEWlFRQlI1?key=3ebb618f759aa60494a77f1ca592c8b2',
  checkoutUrl:
    'https://blizzardrush.myshopify.com/cart/c/Z2NwLXVzLWNlbnRyYWwxOjAxSjlKQ0s4NVBKMUEyVEtZWkZEWlFRQlI1?key=3ebb618f759aa60494a77f1ca592c8b2',
  lines: {
    edges: [
      {
        node: {
          id: 'gid://shopify/CartLine/9d41fb7a-b390-45c5-b596-0b64acfa2e2b?cart=Z2NwLXVzLWNlbnRyYWwxOjAxSjlKQ0s4NVBKMUEyVEtZWkZEWlFRQlI1',
          quantity: 1,
          merchandise: {
            id: 'gid://shopify/ProductVariant/41545735569513',
            title: 'Default Title',
            image: {
              src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/snowboard_sky.png?v=1716602383',
            },
            price: {
              amount: 785.95,
            },
            product: {
              id: 'gid://shopify/Product/7313620828265',
              title: 'The Compare at Price Snowboard',
              variants: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/41545735569513',
                      title: 'Default Title',
                      price: {
                        amount: 785.95,
                      },
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/snowboard_sky.png?v=1716602383',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        node: {
          id: 'gid://shopify/CartLine/39f905a3-c0d3-4b65-a903-2e65d55e74ca?cart=Z2NwLXVzLWNlbnRyYWwxOjAxSjlKQ0s4NVBKMUEyVEtZWkZEWlFRQlI1',
          quantity: 2,
          merchandise: {
            id: 'gid://shopify/ProductVariant/41545735077993',
            title: 'Dawn',
            image: {
              src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
            },
            price: {
              amount: 699.95,
            },
            product: {
              id: 'gid://shopify/Product/7313620631657',
              title: 'The Complete Snowboard',
              variants: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/41545734979689',
                      title: 'Ice',
                      price: {
                        amount: 699.95,
                      },
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/41545735077993',
                      title: 'Dawn',
                      price: {
                        amount: 699.95,
                      },
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/41545735110761',
                      title: 'Powder',
                      price: {
                        amount: 699.95,
                      },
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/41545735209065',
                      title: 'Electric',
                      price: {
                        amount: 699.95,
                      },
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
                      },
                    },
                  },
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/41545735241833',
                      title: 'Sunset',
                      price: {
                        amount: 699.95,
                      },
                      image: {
                        src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ],
  },
}
