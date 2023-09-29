ARG node_version=18.18-alpine3.17

FROM oven/bun:1.0.3@sha256:3d646ab41f639ec5a26b2a286ca1f8b7ce3a630429d04557f94fc9e1f7c29bc5 as builder
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY package.json package.json
RUN bun install

FROM node:${node_version} as base
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=builder /opt/epp-client/node_modules /opt/epp-client/node_modules
COPY ./ ./

FROM base as dev
CMD [ "yarn", "start:dev" ]

FROM base as storybook
CMD [ "yarn", "storybook" ]

FROM base as prod
RUN yarn build
CMD [ "sh", "-c", "yarn build && yarn start" ]

FROM mcr.microsoft.com/playwright:focal as browser-tests
WORKDIR /opt/tests
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY playwright.config.ts playwright.config.ts
RUN yarn
CMD ["yarn", "test:browser"]
