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
import { useEffect, useState } from 'react'
import { useStoreState } from '~/zustand-store'
import './Navbar.css'

const Navbar = () => {
  const { checkout } = useStoreState()

  const [currentScrollPos, setCurrentScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollPos(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentScrollPos])

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
    <nav className={`Navbar ${currentScrollPos > 139 ? 'shadow-lg' : ''}`}>
      <ul className="flex justify-end gap-4 bg-black py-2 pr-12 text-xs font-light text-white">
        <li>
          <Link to="/easy-returns" className="ContrastLink">
            Easy Returns
          </Link>
        </li>
        <li>
          <Link to="/help" className="ContrastLink">
            Get Help
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="ContrastLink">
            Wishlist
          </Link>
        </li>
      </ul>
      <div className="block md:hidden">
        <ul className="flex items-center justify-between px-6 py-3">
          <li className="font-bold">
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link
              to="/"
              className="bg-black p-1 font-anton text-xl uppercase tracking-wide text-white"
            >
              Blizzard Rush
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-2xl font-bold">
              <div className="relative flex items-center gap-1.5">
                {checkout.lineItems?.length > 0 && (
                  <span
                    aria-label={`${checkout.lineItems.length} items in cart`}
                    className="Navbar__cart-number"
                    style={{
                      minWidth: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                      height: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                      width: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                    }}
                  >
                    {checkout.lineItems.length}
                  </span>
                )}
                <HiOutlineShoppingBag />
              </div>
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
                <button type="submit" aria-label="Submit product search">
                  <FaSearch
                    className="text-lg text-white"
                    aria-label="Submit product search"
                  />
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
      <div className="hidden px-16 py-6 md:block">
        <ul className="flex items-center justify-between">
          <li>
            <Link
              to="/"
              className="bg-black p-1.5 font-anton text-3xl uppercase tracking-wide text-white"
            >
              Blizzard Rush
            </Link>
          </li>
          <li>
            <ul className="flex items-center gap-6">
              <li>
                <div className="relative bg-black pb-2 pt-0.5">
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
                            <FormLabel className="sr-only">
                              Product search
                            </FormLabel>
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
              </li>
              <li className="text-xl font-bold">
                <Link to="/about" className="ContrastLink">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className={`text-xl font-bold ${checkout.lineItems?.length > 0 ? 'CartLink' : 'ContrastLink'}`}
                >
                  <div className="relative flex items-center gap-1.5">
                    {checkout.lineItems?.length > 0 && (
                      <span
                        aria-label={`${checkout.lineItems.length} items in cart`}
                        className="Navbar__cart-number"
                        style={{
                          minWidth: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                          height: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                          width: `${Math.max(2, checkout.lineItems.length.toString().length)}em`,
                        }}
                      >
                        {checkout.lineItems.length}
                      </span>
                    )}
                    <HiOutlineShoppingBag /> Cart
                  </div>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
