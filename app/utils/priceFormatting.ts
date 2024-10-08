export type CheckoutLineItem = {
  id: string
  quantity: number
  merchandise: {
    id: string
    image: {
      src: string
    }
    price: {
      amount: number
    }
    product: {
      id: string
      title: string
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

export const getItemSubtotal = (lineItem: CheckoutLineItem) => {
  const subtotal = Number(lineItem.merchandise.price.amount) * lineItem.quantity
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal)
}

export const calculateCartSubtotal = (lineItems: CheckoutLineItem[]) => {
  let subtotal = 0
  lineItems?.forEach((lineItem) => {
    // subtotal +=
    //   Number(lineItem.merchandise.product.variants) * lineItem.quantity
    lineItem.merchandise.product.variants?.edges.forEach((edge) => {
      subtotal += Number(edge.node.price.amount) * lineItem.quantity
    })
  })
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal)
}
