import { CheckoutLineItem } from 'shopify-buy'

export const getItemSubtotal = (lineItem: CheckoutLineItem) => {
  const subtotal = Number(lineItem.variant?.price.amount) * lineItem.quantity
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal)
}

export const calculateCartSubtotal = (lineItems: CheckoutLineItem[]) => {
  let subtotal = 0
  lineItems?.forEach((lineItem) => {
    subtotal += Number(lineItem.variant?.price.amount) * lineItem.quantity
  })
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal)
}
