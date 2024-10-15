export type CheckoutLineItem = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
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
            title: string
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
    const currentVariant = lineItem.merchandise.product.variants?.edges.find(
      (edge) => edge.node.id === lineItem.merchandise.id
    )
    if (currentVariant) {
      subtotal += Number(currentVariant.node.price.amount) * lineItem.quantity
    }
  })
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal)
}
