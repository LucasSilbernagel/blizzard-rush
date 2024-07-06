import { z } from 'zod'
import newsletterLarge from '../../images/newsletter-large.webp'
import newsletterSmall from '../../images/newsletter-small.webp'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const NewsletterSignup = () => {
  const formSchema = z.object({
    emailAddress: z.string().email().toLowerCase().min(5).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const FORM_DESCRIPTION = `Sign up for 10% off your next purchase as well as the latest news,
          product launches and exclusive promotions straight to your inbox.
          Offer valid for new subscribers only.`

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="flex gap-6">
        <div className="w-full xl:w-3/12">
          <img src={newsletterSmall} alt="" />
        </div>
        <div
          style={{
            backgroundImage: `url(${newsletterLarge})`,
          }}
          className="relative hidden w-9/12 bg-cover bg-center bg-no-repeat xl:block"
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <h2 className="absolute -bottom-2 left-2 font-anton text-8xl uppercase text-white">
            Newsletter signup
          </h2>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-anton text-3xl">Complete your subscription</h2>
        <p className="my-4 text-sm">{FORM_DESCRIPTION}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">First name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Last name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default NewsletterSignup
