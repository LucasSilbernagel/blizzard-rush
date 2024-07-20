import { render, screen } from '@testing-library/react'
import SearchForm from './SearchForm'
import { userEvent } from '@testing-library/user-event'

test('renders correctly when the cart is empty', async () => {
  render(<SearchForm />)
  expect(screen.getByRole('searchbox')).toBeVisible()
  expect(screen.getByLabelText('Submit product search')).toBeVisible()
  expect(screen.getByText('Product search')).toBeInTheDocument()
  expect(
    screen.getByText('Search for Blizzard Rush products.')
  ).toBeInTheDocument()
  expect(
    screen.queryByText('Search query must be at least 3 characters.')
  ).not.toBeInTheDocument()
  await userEvent.click(screen.getByLabelText('Submit product search'))
  expect(
    screen.getByText('Search query must be at least 3 characters.')
  ).toBeVisible()
  await userEvent.type(screen.getByRole('searchbox'), 'Snowboard')
  expect(screen.getByRole('searchbox')).toHaveValue('Snowboard')
  await userEvent.click(screen.getByLabelText('Submit product search'))
  expect(
    screen.queryByText('Search query must be at least 3 characters.')
  ).not.toBeInTheDocument()
})
