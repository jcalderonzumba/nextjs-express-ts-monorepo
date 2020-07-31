# nextjs-express-ts-monorepo

This is a skeleton for nextjs express typescript, lerna, yarn workspaces monorepo setup.

## What does it contain?

- **web-client package**

This package contains the nextjs pages + components that the browser will render.

- **web-server package**

This is the custom server that serves both nextjs pages and, also APIs that your webpage might need

- **web-server-logger**

A web logger for the server, shown as an example of how you can have different packages working together
thanks to yarn/lerna monorepo setup

## Running the example

Just run from the root of the folder:

```
yarn install && yarn start
```

## Requirements

This example has been tested with:

- nodejs v12.16.1
- express v4.17.1
- next v9.5.1
- react v16.13.1
