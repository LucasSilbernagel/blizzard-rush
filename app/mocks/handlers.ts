import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post(
    'https://example.myshopify.com/api/2024-04/graphql.json',
    async ({ request }) => {
      const req = await request.json()
      console.log(JSON.stringify(req))
      if (JSON.stringify(req).includes('cartCreate')) {
        return HttpResponse.json({
          data: {
            blah: 'cart initialized mock, this is working',
            // cartCreate: {
            //   cart: {
            //     id: 'gid://shopify/Cart/Z2NwLXVzLWNlbnRyYWwxOjAxSjlTWkNFMTVBMUZLS1pUR1RRNFlQOFlK?key=ef1e8c123cd91f713a8131164e18da42',
            //     checkoutUrl:
            //       'https://blizzardrush.myshopify.com/cart/c/Z2NwLXVzLWNlbnRyYWwxOjAxSjlTWkNFMTVBMUZLS1pUR1RRNFlQOFlK?key=ef1e8c123cd91f713a8131164e18da42',
            //     lines: {
            //       edges: [],
            //     },
            //   },
            // },
          },
        })
      } else if (JSON.stringify(req).includes('cartLinesAdd')) {
        return HttpResponse.json({
          data: {
            cartLinesAdd: {
              cart: {
                id: 'gid://shopify/Cart/Z2NwLXVzLWNlbnRyYWwxOjAxSjlTWkNFMTVBMUZLS1pUR1RRNFlQOFlK?key=ef1e8c123cd91f713a8131164e18da42',
                checkoutUrl:
                  'https://blizzardrush.myshopify.com/cart/c/Z2NwLXVzLWNlbnRyYWwxOjAxSjlTWkNFMTVBMUZLS1pUR1RRNFlQOFlK?key=ef1e8c123cd91f713a8131164e18da42',
                lines: {
                  edges: [
                    {
                      node: {
                        id: 'gid://shopify/CartLine/d9f4b90b-906c-413a-83ab-951564691902?cart=Z2NwLXVzLWNlbnRyYWwxOjAxSjlTWkNFMTVBMUZLS1pUR1RRNFlQOFlK',
                        quantity: 1,
                        merchandise: {
                          id: 'gid://shopify/ProductVariant/41545735209065',
                          title: 'Electric',
                          image: {
                            src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1716602383',
                          },
                          price: {
                            amount: '699.95',
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
                                      amount: '699.95',
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
                                      amount: '699.95',
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
                                      amount: '699.95',
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
                                      amount: '699.95',
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
                                      amount: '699.95',
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
              },
            },
          },
        })
      } else {
        return HttpResponse.json({
          data: {
            cart: {
              id: 'gid://shopify/Cart/Z2NwLXVzLWNlbnRyYWwxOjAxSjlUMDgyV0gyMk1OU0tHSlcyRjdTRVQz?key=5a9e449d2c3f412751a07656af7dd266',
              checkoutUrl:
                'https://blizzardrush.myshopify.com/cart/c/Z2NwLXVzLWNlbnRyYWwxOjAxSjlUMDgyV0gyMk1OU0tHSlcyRjdTRVQz?key=5a9e449d2c3f412751a07656af7dd266',
              lines: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/CartLine/8451f95d-1f71-41af-bcdc-ba3e2a028359?cart=Z2NwLXVzLWNlbnRyYWwxOjAxSjlUMDgyV0gyMk1OU0tHSlcyRjdTRVQz',
                      quantity: 1,
                      merchandise: {
                        id: 'gid://shopify/ProductVariant/41545735766121',
                        title: 'Default Title',
                        image: {
                          src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1716602384',
                        },
                        price: {
                          amount: '1025.0',
                        },
                        product: {
                          id: 'gid://shopify/Product/7313620959337',
                          title: 'The Collection Snowboard: Oxygen',
                          variants: {
                            edges: [
                              {
                                node: {
                                  id: 'gid://shopify/ProductVariant/41545735766121',
                                  title: 'Default Title',
                                  price: {
                                    amount: '1025.0',
                                  },
                                  image: {
                                    src: 'https://cdn.shopify.com/s/files/1/0589/7506/0073/files/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1716602384',
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
            },
          },
        })
      }
    }
  ),
]
