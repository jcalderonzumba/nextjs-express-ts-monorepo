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
