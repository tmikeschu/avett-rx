# Avett Rx

Avett Rx "prescribes" you a song by The Avett Brothers based on how you're feeling.

## Setup

```
yarn install
```

## Test

```
# for the whole enchilada
yarn test:ci

# unit and integration
yarn test
yarn test:watch # with live reload
yarn test:coverage # with coverage report

# e2e
yarn test:cy-open # with GUI
yarn test:cy-run # headless
```

## GraphQL Schema Updates

After editing `schema.graphql`, upload it to FaunaDB via:

```
yarn schema:update
```

## GraphQL Code Generator

Autogenerate TypeScript types based on the GraphQL schema and types.

```
yarn types:build # for a quick update
yarn types:watch # during active development
```

## Local development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

### Local prod build

```
yarn build
yarn start
```

### Previews and Production

All pushed changes are auto-deployed on Vercel.

## Tools

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Cypress](https://www.cypress.io/)
- [GrahpQL Code Generator](https://graphql-code-generator.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [FaunaDB](https://fauna.com/)
- [Auth0](https://auth0.com/)
- [Prettier](https://prettier.io/)
- [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint)
- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mock Service Worker](https://mswjs.io/)
- [Vercel](https://vercel.com)
- [Storybook](https://storybook.js.org/)
