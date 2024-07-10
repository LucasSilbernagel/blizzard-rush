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
} from 'shadcn/components/ui/form'
import { Input } from 'shadcn/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shadcn/components/ui/select'
import { Button } from 'shadcn/components/ui/button'
import { useState } from 'react'
import { Alert } from 'shadcn/components/ui/alert'
import { Link } from '@remix-run/react'
import { FaArrowLeft } from 'react-icons/fa6'

const NewsletterSignup = () => {
  const dateSchema = z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
  }, z.date())

  const formSchema = z.object({
    emailAddress: z.string().email().toLowerCase().min(5).max(50),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    gender: z.string(),
    birthday: dateSchema,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      firstName: '',
      lastName: '',
      birthday: undefined,
    },
  })

  const [firstName, setFirstName] = useState('')

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFirstName(values.firstName)
  }

  const FORM_DESCRIPTION = `Sign up for 10% off your next purchase as well as the latest news,
          product launches and exclusive promotions straight to your inbox.
          Offer valid for new subscribers only.`

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

  return (
    <div className="mx-auto mb-12 max-w-screen-lg px-4">
      {firstName.length > 0 ? (
        // Success state
        <div className="my-52">
          <Alert variant="success" className="text-center">
            Thanks for subscribing, {firstName}!
          </Alert>
          <div>
            <div className="mx-auto my-16 max-w-max">
              <Link
                to="/"
                className="ContrastLink flex items-center gap-2 font-bold"
              >
                <FaArrowLeft /> Continue shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
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
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
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
                        <Input
                          type="text"
                          placeholder="First name"
                          {...field}
                        />
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
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Gender</FormLabel>
                      <FormControl>
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              {genderOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Birthday</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Birthday"
                          {...field}
                          value={String(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit">Subscribe</Button>
                </div>
              </form>
            </Form>
          </div>
        </>
      )}
    </div>
  )
}

export default NewsletterSignup
