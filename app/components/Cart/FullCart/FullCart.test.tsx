import { render, screen } from '@testing-library/react'
import FullCart from './FullCart'

test('renders properly', () => {
  render(<FullCart refetch={jest.fn()} />)
  expect(screen.getByText('Continue shopping')).toBeVisible()
})
