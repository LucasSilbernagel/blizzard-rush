/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import { server } from '~/mocks/node'

// Mocks for @remix-run/react
export const searchInput = ''
export const mockSubmitFn = jest.fn()
export const mockUseLoaderDataFn = jest.fn()
export const mockUseActionData = jest.fn().mockReturnValue({})
export const mockUseLocationFn = jest.fn().mockReturnValue({ pathname: '' })
export const mockUseNavigateFn = jest.fn().mockReturnValue(jest.fn())
export const mockUseNavigationFn = jest.fn().mockReturnValue({
  state: 'idle',
  location: {},
})
export const mockUseMatchesFn = jest.fn()
export const mockUseFetchersFn = jest.fn().mockReturnValue([
  {
    state: 'idle',
    submit: mockSubmitFn,
    Form: ({ children }: { children: JSX.Element }) => <>{children}</>,
  },
])
export const mockSearchParamFn = jest.fn()
export const mockUseSearchParamsFn = jest
  .fn()
  .mockReturnValue([
    { get: () => searchInput, entries: () => [] },
    mockSearchParamFn,
  ])
export const mockUseFetcherFn = jest.fn().mockReturnValue({
  state: 'idle',
  submit: mockSubmitFn,
  Form: ({ children }: { children: JSX.Element }) => <>{children}</>,
})
export const mockUseOutletContextFn = jest.fn()

jest.mock('@remix-run/react', () => ({
  Link: (props: { children: JSX.Element; to: string }) => (
    <a {...props} href={props.to}>
      {props.children}
    </a>
  ),
  NavLink: (props: { children: JSX.Element; to: string }) => (
    <a href={props.to}>{props.children}</a>
  ),
  Await: (props: { children: (arg0: any) => any; resolve: any }) => {
    if (!props) return null
    return <>{props.children(props.resolve)}</>
  },
  Form: (props: any) => (
    <form method={props.method} action={props.action}>
      {props.children}
    </form>
  ),
  useActionData: () => mockUseActionData(),
  useFetcher: () => mockUseFetcherFn(),
  useFetchers: () => mockUseFetchersFn(),
  useLoaderData: () => mockUseLoaderDataFn(),
  useMatches: () => mockUseMatchesFn(),
  useNavigate: () => mockUseNavigateFn(),
  useNavigation: () => mockUseNavigationFn(),
  useLocation: () => mockUseLocationFn(),
  useSearchParams: () => mockUseSearchParamsFn(),
  useOutletContext: () => mockUseOutletContextFn(),
  useParams: () => ({}),
}))

// Mock for @web3-storage/multipart-parser
jest.mock('@web3-storage/multipart-parser', () => ({
  parseMultipartData: jest.fn().mockImplementation(() => {}),
}))

// Mock for get-env.ts
jest.mock('./app/get-env.ts', () => ({
  __esModule: true, // This property makes it compatible with ES Modules
  default: jest.fn(() => ({
    SHOPIFY_DOMAIN: 'example.myshopify.com',
    STOREFRONT_API_ACCESS_TOKEN: 'dummy_access_token',
  })),
}))

// MSW (Mock Service Worker)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

window.HTMLElement.prototype.hasPointerCapture = jest.fn()
window.HTMLElement.prototype.scrollIntoView = jest.fn()
