# Blizzard Rush

Blizzard Rush is a Shopify development store that sells snowboards. Test data is rendered on the Remix front end through Shopify APIs, and Shopify handles the checkout process.

## Live Link

[https://blizzard-rush.vercel.app/](https://blizzard-rush.vercel.app/)

## Tech Stack

### Front End

- [React](https://reactjs.org/)
- [Remix](https://remix.run/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [@mdx-js/rollup](https://mdxjs.com/packages/rollup/)

### Linting & Formatting

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

## Run Locally

### Prerequisites

- In order to run this application locally, you must have Node.js installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have Node.js, you can find installation steps here: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
  - Make sure to install at least version 20 of node.
- Instead of `npm` or `yarn` commands, this project uses `pnpm`. Once you have Node.js installed on your computer, you can install `pnpm` by running `npm install -g pnpm`, or by following other instructions [here](https://pnpm.io/installation).

### Clone the repository

Once you have confirmed that Node.js and `pnpm` are installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/blizzard-rush.git`

Then `cd` into the project folder and open it in your code editor. For Visual Studio Code:

`cd blizzard-rush`
`code .`

### Set up a Shopify development store

- Follow [Shopify's documentation](https://help.shopify.com/en/partners/dashboard/managing-stores/development-stores) on how to set up a development store with generated test data.
- In your development Shopify store, visit `https://admin.shopify.com/store/your-store-name/settings/apps/development` and create a new app to connect to the project's Remix front end. Make sure the app is configured to allow access to the necessary store data.
  - Admin API access scopes: `write_discounts, read_discounts, write_draft_orders, read_draft_orders, write_inventory, read_inventory, write_orders, read_orders, write_price_rules, read_price_rules, write_product_listings, read_product_listings, write_products, read_products, write_purchase_options, read_purchase_options, write_returns, read_returns, write_channels, read_channels, write_shipping, read_shipping, write_locales, read_locales, write_content, read_content`
  - Storefront API access scopes: `unauthenticated_write_checkouts, unauthenticated_read_checkouts, unauthenticated_read_content, unauthenticated_read_product_listings, unauthenticated_read_product_inventory, unauthenticated_read_product_pickup_locations, unauthenticated_read_product_tags, unauthenticated_read_selling_plans, unauthenticated_write_bulk_operations, unauthenticated_read_bulk_operations, unauthenticated_read_customers`
- Make a note of your storefront API access token.

### Environment variables

- Create a `.env` file in the root of the `blizzard-rush` project. Copy and past the contents of `.env.example` into the `.env` file and replace the values with your own. You can update the `PROD_DOMAIN` value if you deploy your project, but it's not important for running the app locally.

### Install dependencies

To install all of the required dependencies, run `pnpm install`.

### Start up the app

- To start up the app locally, run `pnpm run dev` in your terminal. Your terminal should indicate a `localhost` URL at which you can view the app in your browser, most likely http://localhost:5173/.

## Testing

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [msw](https://mswjs.io/)
- [msw](https://mswjs.io/)
- [Playwright](https://playwright.dev/)

### Unit Tests

Unit tests are written with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

Use `pnpm run test-unit` to run all unit tests, or use `pnpm run test-unit SomeFileToRun` to run a specific test file.

### E2E Tests

E2E tests are written with [Playwright](https://playwright.dev/).

Use `pnpm run test-e2e` to run all E2E tests.
