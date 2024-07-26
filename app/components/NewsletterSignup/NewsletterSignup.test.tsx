import { render, screen } from '@testing-library/react'
import NewsletterSignup, { genderOptions } from './NewsletterSignup'
import { userEvent } from '@testing-library/user-event'

test('renders the newsletter signup page correctly', async () => {
  render(<NewsletterSignup />)
  expect(screen.getByText('Newsletter signup')).toBeVisible()
  expect(screen.getByText('Complete your subscription')).toBeVisible()
  expect(
    screen.getByText(
      'Sign up for 10% off your next purchase as well as the latest news, product launches and exclusive promotions straight to your inbox. Offer valid for new subscribers only.'
    )
  ).toBeVisible()
  expect(screen.getByLabelText('Email address')).toBeVisible()
  expect(screen.getByLabelText('First name')).toBeVisible()
  expect(screen.getByLabelText('Last name')).toBeVisible()
  expect(screen.getByText('Gender')).toBeVisible()
  expect(screen.getByLabelText('Birthday')).toBeVisible()
  expect(screen.getByText('Subscribe')).toBeVisible()
})

test('submits the newsletter signup form', async () => {
  render(<NewsletterSignup />)
  expect(screen.getByLabelText('Email address')).toBeVisible()
  await userEvent.type(
    screen.getByLabelText('Email address'),
    'example@email.com'
  )
  await userEvent.type(screen.getByLabelText('First name'), 'Example')
  await userEvent.type(screen.getByLabelText('Last name'), 'Name')
  const selectTrigger = screen.getByRole('combobox')
  await userEvent.click(selectTrigger)
  await userEvent.click(screen.getByRole('option', { name: genderOptions[0] }))
  expect(selectTrigger).toHaveTextContent(genderOptions[0])
  await userEvent.click(screen.getByLabelText('Birthday'))
  await userEvent.type(screen.getByLabelText('Birthday'), '1999-12-25')
  await userEvent.click(screen.getByText('Subscribe'))
  expect(
    screen.queryByText('Complete your subscription')
  ).not.toBeInTheDocument()
  expect(screen.getByText('Thanks for subscribing, Example!')).toBeVisible()
  expect(screen.getByText('Continue shopping')).toBeVisible()
})
