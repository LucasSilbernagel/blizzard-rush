import { useNavigate } from '@remix-run/react'
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
} from 'shadcn/components/ui/form'
import { Input } from 'shadcn/components/ui/input'
import { FaSearch } from 'react-icons/fa'

const SearchForm = () => {
  const navigate = useNavigate()

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
    navigate(`/search?q=${values.searchQuery}`)
  }

  return (
    <div className="relative bg-black pb-2 pt-0.5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative px-2 pl-12"
        >
          <div className="absolute left-6 top-2.5 z-10">
            <button type="submit" aria-label="Submit product search">
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
  )
}

export default SearchForm
