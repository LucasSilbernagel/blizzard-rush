import { Link } from '@remix-run/react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  const formSchema = z.object({
    searchQuery: z
      .string()
      .min(3, { message: 'Search query must be at least 3 characters.' })
      .max(50, { message: 'Search query must be fewer than 50 characters.' })
      .toLowerCase(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <nav>
      <div className="block md:hidden">
        <ul className="flex justify-end gap-4 bg-black py-2 pr-12 text-xs font-light text-white">
          <li>
            <Link to="/easy-returns">Easy Returns</Link>
          </li>
          <li>
            <Link to="/help">Get Help</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
        <ul className="flex items-center justify-between px-6 py-3">
          <li className="font-bold">
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-anton bg-black p-1 text-xl uppercase tracking-wide text-white"
            >
              Blizzard Rush
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-2xl font-bold">
              <HiOutlineShoppingBag />
            </Link>
          </li>
        </ul>
        <div className="relative bg-black pb-1 pt-0.5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative px-2 pl-12"
            >
              <div className="absolute left-6 top-2.5 z-10">
                <button type="submit">
                  <FaSearch className="text-lg text-white" />
                </button>
              </div>
              <FormField
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="sr-only">Product search</FormLabel>
                    <FormControl>
                      <Input
                        type="search"
                        placeholder="Search our store"
                        {...field}
                        className="border-transparent bg-black text-base text-white placeholder:text-white focus:border-transparent"
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Search for Blizzard Rush products.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div></div>
    </nav>
  )
}

export default Navbar
